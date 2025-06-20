<template>
  <div class="video-player-wrapper">
    <h3 v-if="title" class="video-title">{{ title }}</h3>
    <div class="video-container">
      <ScriptYouTubePlayer
        v-if="showVideo"
        ref="youtubePlayer" :video-id="videoId"
        :player-vars="finalPlayervars"
        class="video-iframe-player"
      />

      <div
        v-else
        class="thumbnail-wrapper"
        @click="showVideo = true"
        :aria-label="`Putar video: ${title || 'video'}`"
      >
        <img
          :src="thumbnailUrl"
          :alt="title || 'Video thumbnail'"
          @error="handleImageError"
          class="thumbnail-image"
        />
        <div class="play-button-overlay">
          <div class="play-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div v-if="$slots.default" class="video-description">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// BARU: Impor watch dan nextTick dari vue
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  playerVars: {
    type: Object as () => YT.PlayerVars,
    default: () => ({})
  }
})

const showVideo = ref(false)
const thumbnailQualities = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];
const currentQualityIndex = ref(0);

const thumbnailUrl = computed(() => {
  const quality = thumbnailQualities[currentQualityIndex.value];
  return `https://i.ytimg.com/vi/${props.videoId}/${quality}.jpg`;
});

function handleImageError() {
  if (currentQualityIndex.value < thumbnailQualities.length - 1) {
    currentQualityIndex.value++;
  }
}

const defaultPlayerVars: YT.PlayerVars = {
  rel: 0,
  modestbranding: 1,
  controls: 1,
  fs: 1,
  autoplay: 1, // Kita tetap set autoplay sebagai fallback
}

const finalPlayervars = computed(() => {
  return { ...defaultPlayerVars, ...props.playerVars }
})

// === PERUBAHAN UTAMA UNTUK MEMPERBAIKI AUTOPLAY ===

// BARU: Buat ref untuk menampung instance komponen player
const youtubePlayer = ref<any>(null);

// BARU: Gunakan `watch` untuk mendeteksi kapan `showVideo` berubah menjadi true
watch(showVideo, async (isShowing) => {
  // Jika video akan ditampilkan...
  if (isShowing) {
    // 1. Tunggu hingga DOM selesai diperbarui dan komponen <ScriptYouTubePlayer> benar-benar muncul
    await nextTick();

    // 2. Sekarang kita bisa mengakses ref-nya, jika ada, panggil method `playVideo()`
    if (youtubePlayer.value) {
      // Method playVideo() ini berasal dari komponen ScriptYouTubePlayer itu sendiri
      youtubePlayer.value.playVideo();
    }
  }
})
// ---------------------------------------------------

</script>

<style scoped>
/* CSS tetap sama, tidak perlu diubah */
.video-player-wrapper { margin: 2rem 0; max-width: 720px; margin-left: auto; margin-right: auto; }
.video-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; }
.video-container { width: 100%; aspect-ratio: 16 / 9; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); position: relative; background-color: #2d2d2d; }
.video-iframe-player { width: 100%; height: 100%; }
.thumbnail-wrapper { width: 100%; height: 100%; cursor: pointer; position: relative; }
.thumbnail-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.thumbnail-wrapper:hover .thumbnail-image { transform: scale(1.05); }
.play-button-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; transition: background-color 0.3s ease; }
.thumbnail-wrapper:hover .play-button-overlay { background-color: rgba(0, 0, 0, 0.2); }
.play-icon { color: rgba(255, 255, 255, 0.9); width: 80px; height: 80px; transition: transform 0.3s ease, color 0.3s ease; }
.thumbnail-wrapper:hover .play-icon { transform: scale(1.1); color: white; }
.video-description { margin-top: 0.75rem; font-size: 0.9rem; color: #555; line-height: 1.6; }
</style>