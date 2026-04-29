<script setup lang="ts">
import { Anchor, Calculator, Cpu, Ship } from 'lucide-vue-next'

const { data: latestLogs } = await useAsyncData('latest-logs', () =>
  queryCollection('logs')
    .order('date', 'DESC')
    .limit(3)
    .all()
)

const { data: latestShipyard } = await useAsyncData('latest-shipyard-home', () =>
  queryCollection('shipyard')
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
  title: 'Port of Code — Autonomous Digital Shipyard',
  description: 'Ideas arrive. Agents build. Software ships.',
  ogTitle: 'Port of Code',
  ogDescription: 'A build-in-public software shipyard run by Caleb and an AI crew.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div>
    <section class="max-w-grid mx-auto px-6 py-20 md:py-28">
      <div class="max-w-prose mx-auto text-center">
        <Anchor :size="32" class="text-cyan mx-auto mb-6" />
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-offwhite mb-4 font-heading">
          Port of Code
        </h1>
        <p class="text-xl md:text-2xl text-muted mb-4">
          Autonomous Digital Shipyard
        </p>
        <p class="text-steel text-sm font-code">
          Ideas arrive. Agents build. Software ships.<span class="animate-pulse">_</span>
        </p>
      </div>
    </section>

    <section class="max-w-grid mx-auto px-6 pb-16">
      <div class="bg-darkcard border border-cyan/25 rounded-xl p-6 md:p-8 shadow-lg shadow-cyan/5">
        <div class="grid gap-6 md:grid-cols-[auto,1fr,auto] md:items-center">
          <div class="w-14 h-14 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
            <Calculator :size="28" class="text-cyan" />
          </div>
          <div>
            <p class="font-code text-xs uppercase tracking-wider text-cyan mb-2">Featured build</p>
            <h2 class="text-2xl font-heading font-bold text-offwhite mb-2">Local AI VRAM Calculator</h2>
            <p class="text-muted max-w-2xl">
              Estimate whether a GPU can handle the local model you want to run, including quantization, context length, and the headroom people forget to leave.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row md:flex-col gap-3">
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
              Read the notes
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section v-if="latestShipyard?.length" class="max-w-grid mx-auto px-6 pb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Latest from the shipyard</h2>
        <NuxtLink to="/shipyard" class="text-sm text-muted hover:text-cyan transition-colors font-code">
          View all builds &rarr;
        </NuxtLink>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <PostCard
          v-for="post in latestShipyard"
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
    </section>

    <section v-if="latestLogs?.length" class="max-w-grid mx-auto px-6 pb-16">
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-bold">Latest logs</h2>
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

    <section class="max-w-grid mx-auto px-6 pb-20">
      <div class="grid gap-6 md:grid-cols-2">
        <NuxtLink to="/shipyard" class="group bg-darkcard border border-steel/20 rounded-lg p-8 hover:border-orange/40 transition-all">
          <Ship :size="28" class="text-orange mb-4" />
          <h3 class="text-xl font-heading font-bold mb-2 text-orange transition-colors">Shipyard</h3>
          <p class="text-muted text-sm mb-4">Where projects are designed, built, and launched: software, hardware, infrastructure, and tools.</p>
          <span class="text-xs font-code text-steel">{{ shipyardCount || 0 }} {{ shipyardCount === 1 ? 'project' : 'projects' }}</span>
        </NuxtLink>

        <NuxtLink to="/fleet" class="group bg-darkcard border border-steel/20 rounded-lg p-8 hover:border-cyan/40 transition-all">
          <Cpu :size="28" class="text-cyan mb-4" />
          <h3 class="text-xl font-heading font-bold mb-2 text-cyan transition-colors">Fleet</h3>
          <p class="text-muted text-sm mb-4">The active and retired AI agents behind Port of Code.</p>
          <span class="text-xs font-code text-steel">{{ fleetCount || 0 }} {{ fleetCount === 1 ? 'profile' : 'profiles' }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
