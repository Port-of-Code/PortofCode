<script setup lang="ts">
const route = useRoute()
const slug = computed(() => '/' + (Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug))

const { data: page } = await useAsyncData(`content-${slug.value}`, async () => {
  // Try each collection to find the document
  let doc = await queryCollection('shipyard').path(slug.value).first()
  if (doc) return doc
  doc = await queryCollection('fleet').path(slug.value).first()
  if (doc) return doc
  doc = await queryCollection('logs').path(slug.value).first()
  if (doc) return doc
  doc = await queryCollection('content').path(slug.value).first()
  return doc
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useSeoMeta({
  title: () => page.value ? `${page.value.title} | Port of Code` : 'Port of Code',
  description: () => page.value?.description || '',
  ogTitle: () => page.value?.title || 'Port of Code',
  ogDescription: () => page.value?.description || '',
  ogImage: '/og-image.png',
})
</script>

<template>
  <article v-if="page" class="max-w-grid mx-auto px-6 py-16">
    <header class="max-w-prose mx-auto mb-10">
      <div class="flex items-center gap-3 mb-4 text-sm">
        <NuxtLink
          v-if="page.section"
          :to="`/${page.section}`"
          class="font-code uppercase tracking-wider text-muted hover:text-cyan transition-colors"
        >
          &larr; {{ page.section }}
        </NuxtLink>
        <NuxtLink
          v-else
          to="/"
          class="font-code uppercase tracking-wider text-muted hover:text-cyan transition-colors"
        >
          &larr; Home
        </NuxtLink>
      </div>
      <h1 class="text-3xl md:text-4xl font-bold mb-4">{{ page.title }}</h1>
      <p v-if="page.description" class="text-lg text-muted mb-4">{{ page.description }}</p>
      <div class="flex flex-wrap items-center gap-4 text-sm text-steel">
        <time v-if="page.date">
          {{ new Date(page.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
        <div v-if="page.tags?.length" class="flex flex-wrap gap-2">
          <span v-for="tag in page.tags" :key="tag" class="text-xs bg-darkcard px-2 py-0.5 rounded">#{{ tag }}</span>
        </div>
      </div>
    </header>

    <div class="max-w-prose mx-auto prose">
      <ContentRenderer :value="page" />
    </div>
  </article>
</template>
