<script setup lang="ts">
const { data: posts } = await useAsyncData('fleet-posts', () =>
  queryCollection('fleet')
    .order('date', 'DESC')
    .all()
)

useSeoMeta({
  title: 'Fleet | Port of Code',
  description: 'AI agent swarm — architecture and coordination of autonomous agents.',
  ogTitle: 'Fleet | Port of Code',
  ogDescription: 'AI agent swarm — architecture and coordination of autonomous agents.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div class="max-w-grid mx-auto px-6 py-16">
    <div class="mb-12">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Fleet</h1>
      <p class="text-lg text-muted">AI agent swarm — architecture and coordination of autonomous agents.</p>
    </div>

    <div v-if="posts?.length" class="grid gap-6 md:grid-cols-2">
      <PostCard
        v-for="post in posts"
        :key="post.path"
        :title="post.title"
        :description="post.description"
        :path="post.path"
        :date="post.date"
        :section="post.section"
        :status="post.status"
        :tags="post.tags"
      />
    </div>

    <div v-else class="border border-steel/20 rounded-lg p-8 text-center text-steel">
      <p class="font-code text-sm">No posts yet. Content coming soon.</p>
    </div>
  </div>
</template>
