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

  app: {
    head: {
      title: 'Blog Maunguli - Jasa Tukang Bangunan',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      // Anda bisa menambahkan tag meta lain di sini
      meta: [
        { name: 'description', content: 'Blog seputar tips & trik konstruksi dan renovasi bangunan.' }
      ],
      link: [
        // Menggunakan file .ico sebagai fallback utama
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        
        // Menggunakan file .png untuk browser modern
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },

        // Ikon untuk perangkat Apple (saat di-add to homescreen)
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        
        // Anda juga bisa menambahkan file manifest untuk PWA di sini
        // { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
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