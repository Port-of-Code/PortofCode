<script setup lang="ts">
import { Calendar, Tag } from 'lucide-vue-next'
import { formatContentDate } from '~/utils/date'

const props = defineProps<{
  title: string
  description: string
  path: string
  date?: string
  section?: string
  status?: string
  tags?: string[]
  experiment?: number
}>()

const sectionColors: Record<string, string> = {
  shipyard: 'text-orange border-orange',
  fleet: 'text-cyan border-cyan',
  logs: 'text-cyan border-cyan',
}

const statusColors: Record<string, string> = {
  active: 'bg-cyan/10 text-cyan',
  complete: 'bg-green-500/10 text-green-400',
  archived: 'bg-steel/10 text-steel',
}

const formattedDate = computed(() => {
  if (!props.date) return ''
  return formatContentDate(props.date, 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>

<template>
  <NuxtLink
    :to="path"
    class="block group bg-darkcard border border-steel/20 rounded-lg p-6
           hover:border-cyan/40 hover:shadow-lg hover:shadow-cyan/5
           transition-all duration-200"
  >
    <div class="flex items-start justify-between gap-3 mb-3">
      <span
        v-if="section"
        class="text-xs font-code uppercase tracking-wider border rounded px-2 py-0.5"
        :class="sectionColors[section] || 'text-muted border-steel'"
      >
        {{ experiment ? `Log #${String(experiment).padStart(3, '0')}` : section }}
      </span>
      <span
        v-if="status"
        class="text-xs font-code rounded px-2 py-0.5"
        :class="statusColors[status] || 'bg-steel/10 text-steel'"
      >
        {{ status }}
      </span>
    </div>

    <h3 class="text-lg font-heading font-bold text-offwhite group-hover:text-cyan transition-colors mb-2">
      {{ title }}
    </h3>

    <p class="text-sm text-muted leading-relaxed mb-4">
      {{ description }}
    </p>

    <div class="flex items-center gap-4 text-xs text-steel">
      <span v-if="date" class="flex items-center gap-1">
        <Calendar :size="12" />
        {{ formattedDate }}
      </span>
      <span v-if="tags?.length" class="flex items-center gap-1">
        <Tag :size="12" />
        {{ tags.slice(0, 3).join(', ') }}
      </span>
    </div>
  </NuxtLink>
</template>
