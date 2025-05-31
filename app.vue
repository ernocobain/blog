<template>
  <UApp >
    <NuxtPage />
  </UApp>
</template>

<script setup lang="ts">
const brand = 'maunguli' // Ganti sesuai kebutuhan
useHead({
  bodyAttrs: {
    class: `brand-${brand}`,
  },
})
</script>

