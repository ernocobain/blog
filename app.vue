<template>
  <UApp >
    <HeaderAppHead />
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
import { HeaderAppHead } from '#components';

const brand = 'maunguli' // Ganti sesuai kebutuhan
useHead({
  bodyAttrs: {
    class: `brand-${brand}`,
  },
})
</script>

