<script setup>
defineProps(['src', 'alt', 'title'])
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :title="title"
    format="webp"
    quality="80"
    sizes="sm:100vw md:800px"
    class="rounded-xl my-4"
  />
</template>
