<script setup lang="ts">
defineProps<{
  features: {
    icon: string
    title: string
    description: string
  }[]
}>()
</script>

<template>
  <section class="py-16 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-2xl md:text-3xl font-bold mb-8">Kenapa Memilih Kami?</h2>

      <div class="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6 hover:shadow-xl transition"
        >
          <div class="text-primary text-4xl mb-4">
            <Icon :name="feature.icon" />
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
