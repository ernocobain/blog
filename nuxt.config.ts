// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  // devtools: { enabled: true },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
    preset: 'cloudflare_pages'
  },
ssr:false,
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-disqus',
  ],

  css: [
    '~/assets/css/main.css',
  ],
  disqus: {
    shortname: "maunguli",
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }
  },

 

})