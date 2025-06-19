<template>
  <div class="video-player-wrapper">
    <h3 v-if="title" class="video-title">{{ title }}</h3>
    
    <ScriptYouTubePlayer
      class="video-container"
      :video-id="videoId"
      :player-vars="finalPlayerVars"
    />
    
    <div v-if="$slots.default" class="video-description">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Tidak perlu import YT lagi, karena tipenya sudah tersedia secara global dari @types/youtube
import { computed } from 'vue'

// Mendefinisikan props yang bisa diterima oleh komponen ini
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
    // Tipe YT.PlayerVars akan dikenali secara otomatis
    type: Object as () => YT.PlayerVars,
    default: () => ({})
  }
})

// Setelan default yang kita inginkan untuk semua video
const defaultPlayerVars: YT.PlayerVars = {
  rel: 0, 
  modestbranding: 1,
  controls: 1,
  fs: 1
}

// Menggabungkan setelan default dengan props yang diberikan dari luar
const finalPlayerVars = computed(() => {
  return { ...defaultPlayerVars, ...props.playerVars }
})
</script>

<style scoped>
.video-player-wrapper {
  margin: 2rem 0;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
}

.video-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-description {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
}
</style>