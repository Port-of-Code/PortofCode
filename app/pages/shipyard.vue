<script setup lang="ts">
import { Calculator } from 'lucide-vue-next'

const { data: posts } = await useAsyncData('shipyard-posts', () =>
  queryCollection('shipyard')
    .order('date', 'DESC')
    .all()
)

useSeoMeta({
  title: 'Shipyard',
  description: 'Build notes, tools, hardware experiments, and practical guides from Port of Code.',
  ogTitle: 'Shipyard | Port of Code',
  ogDescription: 'Tools, guides, and build notes from Port of Code.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div class="max-w-grid mx-auto px-6 py-16">
    <div class="mb-12">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Shipyard</h1>
      <p class="text-lg text-muted max-w-prose">Build notes, tools, hardware experiments, and practical guides from Port of Code.</p>
    </div>

    <div class="bg-darkcard border border-cyan/25 rounded-xl p-6 md:p-8 mb-10">
      <div class="flex flex-col md:flex-row md:items-center gap-5">
        <div class="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0">
          <Calculator :size="24" class="text-cyan" />
        </div>
        <div class="flex-1">
          <p class="font-code text-xs uppercase tracking-wider text-cyan mb-2">Current launch</p>
          <h2 class="text-2xl font-heading font-bold text-offwhite mb-2">Local AI VRAM Calculator</h2>
          <p class="text-muted">
            A practical calculator for checking local LLM GPU memory requirements before you buy hardware or download a model that barely fits.
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <a
            href="https://vram.portofcode.com/"
            class="inline-flex items-center justify-center rounded-md bg-cyan px-4 py-2 text-sm font-semibold text-navy hover:bg-cyan/90 transition-colors"
          >
            Open calculator
          </a>
          <NuxtLink
            to="/shipyard/local-ai-vram-calculator"
            class="inline-flex items-center justify-center rounded-md border border-steel/30 px-4 py-2 text-sm text-muted hover:text-offwhite hover:border-cyan/40 transition-colors"
          >
            Read launch notes
          </NuxtLink>
        </div>
      </div>
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
