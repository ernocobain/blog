<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  image?: string
  brandColor?: string
}>()
</script>

<template>
  <section :class="`bg-[${brandColor ?? '#f5f5f5'}]`" class="py-16">
    <div class="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
      <div class="w-full lg:w-1/2 text-center lg:text-left">
        <h1 class="text-4xl font-bold mb-4 leading-tight">
          {{ title }}
        </h1>
        <p class="text-lg text-gray-700 mb-6">
          {{ subtitle }}
        </p>
        <NuxtLink :to="ctaLink">
          <UButton size="lg" :style="`background-color: ${brandColor}`">
            {{ ctaText }}
          </UButton>
        </NuxtLink>
      </div>
      <div class="w-full lg:w-1/2">
        <img :src="image" alt="Hero Image" class="w-full h-auto rounded-xl shadow-lg" v-if="image" />
      </div>
    </div>
  </section>
</template>
