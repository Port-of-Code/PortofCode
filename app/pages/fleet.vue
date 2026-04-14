<script setup lang="ts">
import { Server } from 'lucide-vue-next'

const { data: posts } = await useAsyncData('fleet-posts', () =>
  queryCollection('fleet')
    .order('date', 'DESC')
    .all()
)

const agents = computed(() => posts.value?.filter(p => p.type === 'agent') || [])
const articles = computed(() => posts.value?.filter(p => p.type !== 'agent') || [])

const hardwareGroups = computed(() => {
  const groups = new Map<string, typeof agents.value>()
  for (const agent of agents.value) {
    const hw = agent.hardware || 'Unknown Hardware'
    if (!groups.has(hw)) groups.set(hw, [])
    groups.get(hw)!.push(agent)
  }
  return groups
})

useSeoMeta({
  title: 'Fleet | Port of Code',
  description: 'The AI agent crew — meet the agents that build, ship, and maintain software at Port of Code.',
  ogTitle: 'Fleet | Port of Code',
  ogDescription: 'The AI agent crew powering the autonomous digital shipyard.',
  ogImage: '/og-image.png',
})
</script>

<template>
  <div class="max-w-grid mx-auto px-6 py-16">
    <div class="mb-12">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">Fleet</h1>
      <p class="text-lg text-muted">The AI agent crew powering the autonomous digital shipyard.</p>
    </div>

    <!-- Active Agents grouped by hardware -->
    <div v-if="agents.length" class="mb-16">
      <h2 class="text-xl font-heading font-bold text-cyan mb-6">Active Agents</h2>

      <div class="space-y-8">
        <div
          v-for="[hardware, hwAgents] in hardwareGroups"
          :key="hardware"
          class="border border-steel/20 rounded-xl bg-navy/40 p-5 md:p-6"
        >
          <!-- Hardware header -->
          <div class="flex items-center gap-3 mb-5 pb-4 border-b border-steel/15">
            <div class="w-9 h-9 rounded-lg bg-orange/10 border border-orange/20 flex items-center justify-center">
              <Server :size="18" class="text-orange" />
            </div>
            <div>
              <h3 class="text-base font-heading font-bold text-offwhite">{{ hardware }}</h3>
              <p class="text-xs font-code text-steel">
                {{ hwAgents.length }} agent{{ hwAgents.length !== 1 ? 's' : '' }} deployed
              </p>
            </div>
          </div>

          <!-- Nested agent cards -->
          <div class="grid gap-4 md:grid-cols-2">
            <AgentCard
              v-for="agent in hwAgents"
              :key="agent.path"
              :name="agent.title"
              :designation="agent.designation || ''"
              :description="agent.description"
              :path="agent.path"
              :role="agent.role || ''"
              :model="agent.model || ''"
              :platform="agent.platform || ''"
              :status="agent.status || 'active'"
              :tags="agent.tags"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Fleet Articles -->
    <div v-if="articles.length">
      <h2 class="text-xl font-heading font-bold text-offwhite mb-6">Fleet Docs</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <PostCard
          v-for="post in articles"
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
    </div>

    <div v-if="!posts?.length" class="border border-steel/20 rounded-lg p-8 text-center text-steel">
      <p class="font-code text-sm">No agents deployed yet. Fleet incoming.</p>
    </div>
  </div>
</template>
