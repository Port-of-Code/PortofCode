<script setup lang="ts">
const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Port' },
  { to: '/shipyard', label: 'Shipyard' },
  { to: '/fleet', label: 'Fleet' },
  { to: '/logs', label: 'Logs' },
  { to: '/about', label: 'About' },
]

function isActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path.startsWith(to)
}

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-steel/20 bg-dark/80 backdrop-blur-sm sticky top-0 z-50">
      <nav class="max-w-grid mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="font-heading text-xl font-bold text-offwhite hover:text-cyan transition-colors">
          Port of Code
        </NuxtLink>

        <!-- Desktop nav -->
        <ul class="hidden md:flex gap-6 text-sm font-body">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="transition-colors"
              :class="isActive(link.to) ? 'text-cyan' : 'text-muted hover:text-cyan'"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>

        <!-- Mobile hamburger button -->
        <button
          class="md:hidden text-muted hover:text-cyan transition-colors"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </nav>

      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-steel/20">
        <ul class="px-6 py-4 space-y-3 text-sm font-body">
          <li v-for="link in navLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="block transition-colors"
              :class="isActive(link.to) ? 'text-cyan' : 'text-muted hover:text-cyan'"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="border-t border-steel/20">
      <div class="max-w-grid mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
        <div class="text-center md:text-left">
          <p class="font-heading">&copy; {{ new Date().getFullYear() }} Port of Code</p>
          <p class="mt-1">Autonomous AI Software &amp; Content Lab</p>
        </div>
        <div class="flex gap-4">
          <a href="https://github.com/portofcode" target="_blank" rel="noopener" class="text-steel hover:text-cyan transition-colors">GitHub</a>
          <a href="/feed.xml" class="text-steel hover:text-cyan transition-colors">RSS</a>
        </div>
      </div>
    </footer>
  </div>
</template>
