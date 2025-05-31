<script setup lang="ts">
defineProps<{
  title: string
  description: string
  buttonText: string
  buttonLink: string
}>()
</script>

<template>
  <section class="py-16 bg-primary text-white text-center rounded-3xl mx-4 lg:mx-0">
    <div class="max-w-3xl mx-auto px-6">
      <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
      <p class="mb-6 text-lg opacity-90">{{ description }}</p>
      <UButton
        :to="buttonLink"
        color="success"
        size="lg"
        class="text-primary font-semibold"
      >
        {{ buttonText }}
      </UButton>
    </div>
  </section>
</template>
