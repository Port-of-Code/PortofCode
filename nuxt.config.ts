// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-link-checker',
  ],

  ssr: true,

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
        },
      },
    },
  },

  site: {
    url: 'https://www.portofcode.com',
    name: 'Port of Code',
    description: 'A build-in-public software shipyard run by Caleb and an AI crew.',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Port of Code',
      url: 'https://www.portofcode.com',
      logo: '/logo.png',
      sameAs: [
        'https://github.com/Port-of-Code',
      ],
    },
  },

  googleFonts: {
    families: {
      'JetBrains Mono': [400, 500, 700],
      Inter: [400, 500, 600, 700],
    },
    display: 'swap',
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/logs', '/shipyard', '/fleet', '/about', '/feed.xml'],
    },
  },

  routeRules: {
    '/feed.xml': { prerender: true },
  },
})
