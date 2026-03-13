<script setup lang="ts">
import { Info, AlertTriangle, FlaskConical } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  type?: 'info' | 'warning' | 'experiment'
}>(), {
  type: 'info',
})

const configs: Record<string, { icon: any; border: string; bg: string; iconColor: string }> = {
  info: {
    icon: Info,
    border: 'border-cyan',
    bg: 'bg-cyan/5',
    iconColor: 'text-cyan',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-orange',
    bg: 'bg-orange/5',
    iconColor: 'text-orange',
  },
  experiment: {
    icon: FlaskConical,
    border: 'border-rust',
    bg: 'bg-rust/5',
    iconColor: 'text-rust',
  },
}

const config = computed(() => configs[props.type] || configs.info)
</script>

<template>
  <div
    class="border-l-4 rounded-r-lg p-4 my-6 not-prose"
    :class="[config.border, config.bg]"
  >
    <div class="flex items-start gap-3">
      <component :is="config.icon" :size="20" :class="config.iconColor" class="mt-0.5 shrink-0" />
      <div class="text-sm text-offwhite/90 leading-relaxed">
        <slot />
      </div>
    </div>
  </div>
</template>
