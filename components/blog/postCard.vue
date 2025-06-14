<script setup lang="ts">
defineProps<{
  title: string
  date: string
  path: string
  excerpt?: string
  cover: {
    mobile: string
    desktop: string
  }
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Responsive Image -->
    <picture>
      <source :srcset="cover.desktop" media="(min-width: 768px)" />
      <NuxtImg :src="cover.mobile" alt="Blog cover" class="w-full h-48 object-cover rounded-xl" />
    </picture>

    <div class="flex flex-col gap-2">
      <h2 class="text-xl font-semibold leading-tight line-clamp-2">
        {{ title }}
      </h2>
      <p class="text-gray-500 text-sm">{{ new Date(date).toLocaleDateString() }}</p>
      <p v-if="excerpt" class="text-gray-700 text-sm line-clamp-3">
        {{ excerpt }}
      </p>
    </div>
  </div>
</template>
