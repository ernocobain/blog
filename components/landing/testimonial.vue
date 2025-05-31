<script setup lang="ts">
defineProps<{
  testimonials?: {
    name: string
    message: string
    location?: string
  }[]
  showPlaceholder?: boolean
}>()
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-10">Apa Kata Mereka</h2>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(t, index) in (testimonials?.length ? testimonials : (showPlaceholder ? placeholderTestimonials : []))"
          :key="index"
          class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
        >
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 italic">"{{ t.message }}"</p>
          <div class="text-sm font-semibold text-gray-900 dark:text-white">- {{ t.name }}</div>
          <div v-if="t.location" class="text-xs text-gray-500">{{ t.location }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
const placeholderTestimonials = [
  {
    name: 'Ibu Rina',
    message: 'Tukangnya cepat datang dan hasilnya rapi. Recommended!',
    location: 'Jakarta'
  },
  {
    name: 'Pak Joko',
    message: 'Pekerjaan selesai sesuai waktu. Terima kasih MauNguli!',
    location: 'Bandung'
  },
  {
    name: 'Bu Ani',
    message: 'Harga transparan dan pelayanan ramah. Pasti order lagi!',
    location: 'Bekasi'
  }
]
</script>
