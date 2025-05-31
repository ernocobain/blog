<script setup lang="ts">
defineProps<{
  title: string
  path: string
  date?: string
  cover?: string
  excerpt?: string
}>()
</script>

<template>
  <UCard class="hover:shadow-md transition-shadow p-4 space-y-3">
    <NuxtLink :to="path" class="block">
      <img
        v-if="cover"
        :src="cover"
        alt="Cover image"
        class="w-full h-32 object-cover rounded-lg mb-2"
      />
      <h3 class="text-primary font-semibold text-base hover:underline">
        {{ title }}
      </h3>
    </NuxtLink>

    <p v-if="date" class="text-xs text-gray-500 dark:text-gray-400">
      {{ new Date(date).toLocaleDateString() }}
    </p>

    <p v-if="excerpt" class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
      {{ excerpt }}
    </p>
  </UCard>
</template>
