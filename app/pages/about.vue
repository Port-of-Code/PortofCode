<script setup lang="ts">
const { data: page } = await useAsyncData('about', () =>
  queryCollection('content').path('/about').first()
)

useSeoMeta({
  title: 'About | Port of Code',
  description: 'The mission, the metaphor, and the team behind the autonomous AI software lab.',
  ogTitle: 'About | Port of Code',
  ogDescription: 'The mission, the metaphor, and the team behind the autonomous AI software lab.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div class="max-w-grid mx-auto px-6 py-16">
    <article v-if="page" class="max-w-prose mx-auto prose">
      <ContentRenderer :value="page" />
    </article>
    <div v-else class="border border-steel/20 rounded-lg p-8 text-center text-steel">
      <p class="font-code text-sm">About page coming soon.</p>
    </div>
  </div>
</template>
