---
title: "Booting a Raspberry Pi 5 from an NVMe SSD"
description: "A step-by-step guide to migrating from SD card to NVMe SSD on a Raspberry Pi 5, including the gotchas we hit along the way."
section: shipyard
type: build-guide
date: "2026-03-17"
tags: [raspberry-pi, nvme, ssd, hardware, guide]
status: complete
---

If you're running anything persistent on a Raspberry Pi — especially an always-on AI agent — you'll want to ditch the SD card sooner rather than later. SD cards aren't designed for the constant read/write cycles that a live system generates. An NVMe SSD is faster, more reliable, and not much more expensive.

Here's how we migrated our Pi 5 from a 128GB SD card to a 256GB Samsung NVMe SSD, including everything that went wrong and how we fixed it.

---

### What You Need

- **Raspberry Pi 5** (8GB in our case)
- **M.2 HAT+** for Raspberry Pi 5 (official or compatible)
- **NVMe SSD** (we used a Samsung 256GB, M.2 2230 form factor)
- A working Raspberry Pi OS installation on your SD card

---

### Step 1: Install the Hardware

Mount the M.2 HAT+ on top of the Pi 5 and slot in the NVMe drive. After booting from the SD card, verify the SSD is detected:

```bash
lsblk -o NAME,SIZE,TYPE,MODEL
```

You should see something like:

```
nvme0n1     238.5G disk   SAMSUNG MZAL8256HDJD-00BL2
```

If the NVMe drive doesn't show up, you may need to add this to `/boot/firmware/config.txt`:

```
dtparam=pciex1
```

Then reboot and check again.

---

### Step 2: Clone the SD Card

This is where we hit our first problem.

**What we tried first: `rpi-clone`**

The standard `rpi-clone` tool doesn't handle NVMe partition naming correctly. NVMe drives use a `p` before partition numbers (`nvme0n1p1`, `nvme0n1p2`) while SD cards don't (`mmcblk0p1` vs the internal naming). The original `rpi-clone` tries to mount `/dev/nvme0n12` instead of `/dev/nvme0n1p2`, which fails:

```
Mount failure of /dev/nvme0n12 on /mnt/clone. Aborting!
```

**What worked: Jeff Geerling's fork of rpi-clone**

[Jeff Geerling maintains a fork](https://github.com/geerlingguy/rpi-clone) that properly handles NVMe partition naming. Install and run it:

```bash
git clone https://github.com/geerlingguy/rpi-clone.git
cd rpi-clone
sudo cp rpi-clone /usr/local/sbin/
sudo rpi-clone nvme0n1
```

This will:
- Partition the SSD to match your SD card layout
- Format both partitions (vfat for boot, ext4 for root)
- Clone the filesystem
- Update `/etc/fstab` and `/boot/firmware/cmdline.txt` with the new PARTUUIDs

**Alternative: Manual rsync approach**

If `rpi-clone` still gives you trouble, you can do it manually:

```bash
# Partition the SSD
sudo parted /dev/nvme0n1 --script mklabel msdos
sudo parted /dev/nvme0n1 --script mkpart primary fat32 1MiB 513MiB
sudo parted /dev/nvme0n1 --script mkpart primary ext4 513MiB 100%

# Format
sudo mkfs.vfat -F 32 /dev/nvme0n1p1
sudo mkfs.ext4 -F /dev/nvme0n1p2

# Mount and clone
sudo mkdir -p /mnt/ssd-boot /mnt/ssd-root
sudo mount /dev/nvme0n1p1 /mnt/ssd-boot
sudo mount /dev/nvme0n1p2 /mnt/ssd-root

sudo rsync -axHAWXS --numeric-ids --info=progress2 / /mnt/ssd-root/
sudo rsync -axHAWXS --numeric-ids --info=progress2 --exclude='System Volume Information' /boot/firmware/ /mnt/ssd-boot/
```

Then manually update the PARTUUIDs:

```bash
# Get the new UUIDs
sudo blkid /dev/nvme0n1p1 /dev/nvme0n1p2

# Update fstab on the SSD
sudo nano /mnt/ssd-root/etc/fstab

# Update cmdline.txt on the SSD boot partition
sudo nano /mnt/ssd-boot/cmdline.txt
```

Replace the old SD card PARTUUIDs with the NVMe ones in both files.

---

### Step 3: Set the Boot Order

Tell the Pi to boot from NVMe first:

```bash
EDITOR="tee" sudo -E rpi-eeprom-config --edit <<'EOF'
[all]
BOOT_UART=1
BOOT_ORDER=0xf416
NET_INSTALL_AT_POWER_ON=0
EOF
```

Boot order codes:
- `6` = NVMe
- `4` = USB
- `1` = SD card
- `f` = restart the loop

So `0xf416` means: try NVMe → try SD → try USB → restart.

**Note:** The default `rpi-eeprom-config --edit` opens `nano`, which won't work if you're running headless through an agent or non-TTY shell. The `EDITOR="tee"` trick pipes the config directly without needing an interactive editor.

---

### Step 4: Reboot and Verify

```bash
sudo reboot
```

After the Pi comes back up:

```bash
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT
```

You should see the NVMe partitions mounted:

```
nvme0n1     238.5G disk
├─nvme0n1p1   512M part /boot/firmware
└─nvme0n1p2   238G part /
```

The SD card will still show up but with no mount points — it's now just a backup.

---

### Troubleshooting

**SSD not detected after install:**
Add `dtparam=pciex1` to `/boot/firmware/config.txt` and reboot. Some M.2 HATs need this to enable the PCIe lane.

**`rpi-clone` fails with "can't lookup blocked":**
The original `rpi-clone` doesn't handle NVMe naming. Use [Jeff Geerling's fork](https://github.com/geerlingguy/rpi-clone) instead.

**Boot partition goes read-only during rsync:**
The vfat boot partition can sometimes remount as read-only mid-transfer. Unmount, remount with `-o rw`, and re-run the rsync.

**Pi still boots from SD card after changing boot order:**
Make sure the EEPROM update was successful (`VERIFY: SUCCESS` in the output). Double-check that `cmdline.txt` on the SSD boot partition points to the correct NVMe PARTUUID, not the old SD card one.

---

### The Result

Our Pi 5 now boots from a Samsung 256GB NVMe SSD. The SD card stays in as a fallback. Boot times are noticeably faster, and we no longer have to worry about SD card wear from the constant I/O that an always-on OpenClaw agent generates.

Total cost of the upgrade: ~$23 for the M.2 HAT+ and ~$68 for the SSD on Amazon. Worth every penny.
