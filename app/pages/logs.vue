<script setup lang="ts">
const { data: logs } = await useAsyncData('logs-posts', () =>
  queryCollection('logs')
    .order('date', 'DESC')
    .all()
)

useSeoMeta({
  title: 'Experiment Logs',
  description: 'Chronological documentation of every experiment run at the lab.',
  ogTitle: 'Experiment Logs | Port of Code',
  ogDescription: 'Chronological documentation of every experiment run at the lab.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div class="max-w-grid mx-auto px-6 py-16">
    <div class="mb-12">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Experiment Logs</h1>
      <p class="text-lg text-muted">Chronological documentation of every experiment run at the lab.</p>
    </div>

    <div v-if="logs?.length" class="grid gap-6">
      <PostCard
        v-for="log in logs"
        :key="log.path"
        :title="log.title"
        :description="log.description"
        :path="log.path"
        :date="log.date"
        :section="log.section"
        :status="log.status"
        :experiment="log.experiment"
        :tags="log.tags"
      />
    </div>

    <div v-else class="border border-steel/20 rounded-lg p-8 text-center text-steel">
      <p class="font-code text-sm">No logs yet. Experiments coming soon.</p>
    </div>
  </div>
</template>
