<script setup lang="ts">
import { Hash, Target, Server } from 'lucide-vue-next'

defineProps<{
  experiment?: number
  title?: string
  objective?: string
  infrastructure?: string
}>()
</script>

<template>
  <div class="bg-darkcard border border-steel/20 rounded-lg p-6 my-8 not-prose">
    <div class="flex items-center gap-2 mb-4">
      <Hash :size="18" class="text-orange" />
      <span class="font-heading text-sm text-orange uppercase tracking-wider">
        Experiment {{ String(experiment).padStart(3, '0') }}
      </span>
    </div>
    <h2 v-if="title" class="font-heading text-xl font-bold text-offwhite mb-4">
      {{ title }}
    </h2>
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
      <div v-if="objective" class="flex items-start gap-2">
        <Target :size="14" class="text-cyan mt-1 shrink-0" />
        <div>
          <dt class="text-steel text-xs uppercase tracking-wider">Objective</dt>
          <dd class="text-offwhite">{{ objective }}</dd>
        </div>
      </div>
      <div v-if="infrastructure" class="flex items-start gap-2">
        <Server :size="14" class="text-cyan mt-1 shrink-0" />
        <div>
          <dt class="text-steel text-xs uppercase tracking-wider">Infrastructure</dt>
          <dd class="text-offwhite">{{ infrastructure }}</dd>
        </div>
      </div>
    </dl>
  </div>
</template>
