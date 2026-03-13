<script setup lang="ts">
import { Anchor } from 'lucide-vue-next'

defineProps<{
  error: {
    statusCode: number
    statusMessage: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-dark flex items-center justify-center px-6">
    <div class="text-center max-w-md">
      <Anchor :size="64" class="text-steel mx-auto mb-6 opacity-50" />
      <h1 class="text-6xl font-heading font-bold text-offwhite mb-4">
        {{ error.statusCode }}
      </h1>
      <h2 class="text-2xl font-heading text-muted mb-4">
        Lost at sea?
      </h2>
      <p class="text-steel mb-8">
        {{ error.statusCode === 404
          ? 'This page has drifted beyond the harbor. It may have been moved or no longer exists.'
          : 'Something went wrong in the engine room. The crew has been notified.'
        }}
      </p>
      <button
        class="inline-flex items-center gap-2 bg-cyan/10 text-cyan border border-cyan/30
               px-6 py-3 rounded-lg font-code text-sm
               hover:bg-cyan/20 transition-colors"
        @click="handleError"
      >
        Return to Port
      </button>
    </div>
  </div>
</template>
