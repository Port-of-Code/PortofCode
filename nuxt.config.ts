// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/sitemap',
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
    url: 'https://portofcode.com',
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
