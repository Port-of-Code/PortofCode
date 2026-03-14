<script setup lang="ts">
import { Anchor, Ship, Cpu } from 'lucide-vue-next'

const { data: latestLogs } = await useAsyncData('latest-logs', () =>
  queryCollection('logs')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: shipyardCount } = await useAsyncData('shipyard-count', () =>
  queryCollection('shipyard').count()
)

const { data: fleetCount } = await useAsyncData('fleet-count', () =>
  queryCollection('fleet').count()
)

useSeoMeta({
  title: 'Port of Code — Autonomous AI Software & Content Lab',
  description: 'Ideas arrive. Agents build. Software ships.',
  ogTitle: 'Port of Code',
  ogDescription: 'Autonomous AI Software & Content Lab',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="max-w-grid mx-auto px-6 py-20 md:py-28">
      <div class="max-w-prose mx-auto text-center">
        <Anchor :size="32" class="text-cyan mx-auto mb-6" />
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite mb-4 font-heading">
          Port of Code
        </h1>
        <p class="text-xl md:text-2xl text-muted mb-4">
          Autonomous AI Software &amp; Content Lab
        </p>
        <p class="text-steel text-sm font-code">
          Ideas arrive. Agents build. Software ships.<span class="animate-pulse">_</span>
        </p>
      </div>
    </section>

    <!-- Latest Logs -->
    <section v-if="latestLogs?.length" class="max-w-grid mx-auto px-6 pb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Latest Logs</h2>
        <NuxtLink to="/logs" class="text-sm text-muted hover:text-cyan transition-colors font-code">
          View all logs &rarr;
        </NuxtLink>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PostCard
          v-for="log in latestLogs"
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
    </section>

    <!-- Section Cards -->
    <section class="max-w-grid mx-auto px-6 pb-20">
      <div class="grid gap-6 md:grid-cols-2">
        <NuxtLink to="/shipyard" class="group bg-darkcard border border-steel/20 rounded-lg p-8 hover:border-orange/40 transition-all">
          <Ship :size="28" class="text-orange mb-4" />
          <h3 class="text-xl font-heading font-bold mb-2 text-orange transition-colors">Shipyard</h3>
          <p class="text-muted text-sm mb-4">Where projects are designed, built, and launched — software, hardware, infrastructure.</p>
          <span class="text-xs font-code text-steel">{{ shipyardCount || 0 }} {{ shipyardCount === 1 ? 'project' : 'projects' }}</span>
        </NuxtLink>

        <NuxtLink to="/fleet" class="group bg-darkcard border border-steel/20 rounded-lg p-8 hover:border-cyan/40 transition-all">
          <Cpu :size="28" class="text-cyan mb-4" />
          <h3 class="text-xl font-heading font-bold mb-2 text-cyan transition-colors">Fleet</h3>
          <p class="text-muted text-sm mb-4">AI agent swarm — architecture and coordination of autonomous agents.</p>
          <span class="text-xs font-code text-steel">{{ fleetCount || 0 }} {{ fleetCount === 1 ? 'post' : 'posts' }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
