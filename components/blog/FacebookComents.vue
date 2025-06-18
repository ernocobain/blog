<template>
  <div 
    class="fb-comments" 
    :data-href="fullUrl" 
    data-width="100%" 
    data-numposts="5"
  >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  url: {
    type: String,
    required: true
  }
});

// Membuat URL lengkap dan bersih untuk Facebook
const fullUrl = computed(() => `https://blog.maunguli.com${props.url}`);

// Fungsi untuk memuat dan menginisialisasi Facebook SDK
const initFacebookSDK = () => {
  if (document.getElementById('facebook-jssdk')) {
    // Jika SDK sudah ada, cukup parse ulang untuk mendeteksi plugin baru
    window.FB.XFBML.parse();
    return;
  }

  // Jika SDK belum ada, buat dan tambahkan ke halaman
  const script = document.createElement('script');
  script.id = 'facebook-jssdk';
  script.src = "https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v23.0&appId=889930335189840"; // GANTI DENGAN APP ID ANDA
  script.async = true;
  script.defer = true;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);

  window.fbAsyncInit = function() {
    window.FB.init({
      appId: 'YOUR_APP_ID', // GANTI DENGAN APP ID ANDA
      xfbml: true,
      version: 'v19.0'
    });
  };
};

onMounted(() => {
  initFacebookSDK();
});

// Jika navigasi terjadi di sisi client, FB plugin perlu di-refresh
const route = useRoute();
watch(() => route.fullPath, () => {
  if (window.FB) {
    // Tunggu sebentar agar DOM update, lalu parse ulang
    nextTick(() => {
      window.FB.XFBML.parse();
    });
  }
});
</script>