<script setup lang="ts">
import { Bot, Cpu, MessageSquare, Zap } from 'lucide-vue-next'

const props = defineProps<{
  name: string
  designation: string
  description: string
  path: string
  role: string
  model: string
  platform: string
  status: string
  tags?: string[]
}>()

const statusColors: Record<string, string> = {
  active: 'bg-cyan/10 text-cyan border-cyan/30',
  standby: 'bg-orange/10 text-orange border-orange/30',
  offline: 'bg-steel/10 text-steel border-steel/30',
}
</script>

<template>
  <NuxtLink
    :to="path"
    class="block group bg-darkcard border border-steel/20 rounded-lg p-6
           hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5
           transition-all duration-200"
  >
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/20 flex items-center justify-center">
          <Bot :size="20" class="text-cyan" />
        </div>
        <div>
          <h3 class="text-lg font-heading font-bold text-offwhite group-hover:text-cyan transition-colors">
            {{ name }}
          </h3>
          <p class="text-xs font-code text-steel">{{ designation }}</p>
        </div>
      </div>
      <span
        class="text-xs font-code rounded-full px-2.5 py-0.5 border"
        :class="statusColors[status] || statusColors.offline"
      >
        {{ status }}
      </span>
    </div>

    <p class="text-sm text-muted leading-relaxed mb-4">{{ description }}</p>

    <div class="grid grid-cols-1 gap-2 text-xs text-steel mb-4">
      <div class="flex items-center gap-2">
        <Zap :size="12" class="text-cyan" />
        <span class="text-muted">Role:</span>
        <span class="text-offwhite/80">{{ role }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Cpu :size="12" class="text-cyan" />
        <span class="text-muted">Model:</span>
        <span class="text-offwhite/80">{{ model }}</span>
      </div>
      <div class="flex items-center gap-2">
        <MessageSquare :size="12" class="text-cyan" />
        <span class="text-muted">Platform:</span>
        <span class="text-offwhite/80">{{ platform }}</span>
      </div>
    </div>

    <div v-if="tags?.length" class="flex flex-wrap gap-1.5">
      <span
        v-for="tag in tags"
        :key="tag"
        class="text-xs bg-dark px-2 py-0.5 rounded text-steel"
      >
        #{{ tag }}
      </span>
    </div>
  </NuxtLink>
</template>
