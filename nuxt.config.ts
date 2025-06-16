// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
    },
    preset: 'cloudflare_pages',
    routeRules: {
      '/__preview.json': {
        cors: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
      }
    }
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-disqus',
  ],

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'blog',
        owner: 'ernocobain',
        url: 'https://github.com/ernocobain/blog.git'
      }
    },
  },


  css: [
    '~/assets/css/main.css',
    '@/assets/css/prose.css' 
  ],
  disqus: {
    shortname: "maunguli",
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'tertiary', 'info', 'success', 'warning', 'error']
    }
  },

  vite: {
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Memisahkan vendor dari kode utama
          }
        }
      }
    }
  }
},

  build:{
    analyze: true
  }


})