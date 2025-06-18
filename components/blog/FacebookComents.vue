<script setup lang="ts">
// Komponen ini menerima path URL dari halaman saat ini
const props = defineProps({
  path: {
    type: String,
    required: true
  }
});

// GANTI DENGAN FACEBOOK APP ID ANDA SETELAH DIBUAT
const FACEBOOK_APP_ID = "889930335189840"; 

// Membuat URL lengkap dari halaman yang akan diberi komentar
const fullPageUrl = computed(() => `https://blog.maunguli.com${props.path}`);

// Fungsi untuk memuat Facebook SDK jika belum ada di halaman
const initializeFacebookSdk = () => {
  // Cek apakah SDK sudah dimuat sebelumnya
  if (document.getElementById('facebook-jssdk')) {
    // Jika sudah ada, kita hanya perlu memerintahkan Facebook untuk
    // memindai ulang halaman dan merender plugin yang mungkin baru ditambahkan.
    if (window.FB) {
      window.FB.XFBML.parse();
    }
    return;
  }

  // Jika SDK belum ada, kita buat elemen script-nya
  const script = document.createElement('script');
  script.id = 'facebook-jssdk';
  script.src = `https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v20.0&appId=${FACEBOOK_APP_ID}&autoLogAppEvents=1`;
  script.async = true;
  script.defer = true;
  script.crossOrigin = 'anonymous';
  
  // Fungsi ini akan dipanggil setelah SDK selesai dimuat
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: FACEBOOK_APP_ID,
      xfbml: true,
      version: 'v20.0'
    });
  };

  // Masukkan script ke dalam elemen <head>
  document.head.appendChild(script);
};

// Panggil fungsi inisialisasi saat komponen pertama kali dimuat di browser
onMounted(() => {
  initializeFacebookSdk();
});

// Di Nuxt, halaman bisa berganti tanpa reload. Kita perlu memantau
// perubahan URL untuk memastikan plugin komentar di-refresh.
const route = useRoute();
watch(() => route.fullPath, () => {
  // Tunggu DOM diperbarui, lalu parse ulang plugin FB
  nextTick(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  });
}, { deep: true, immediate: true });
</script>