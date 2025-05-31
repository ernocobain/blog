<script setup lang="ts">
const { url, identifier, shortname } = defineProps<{
  url: string
  identifier: string
  shortname: string
}>()

function copyLink() {
  navigator.clipboard.writeText(url)
  alert('Link berhasil disalin!')
}
</script>

<template>
  <section class="mt-12 space-y-6">
    <!-- Share Buttons -->
    <div class="flex flex-wrap items-center gap-4 text-sm">
      <span class="font-medium text-gray-600 dark:text-gray-400">Bagikan:</span>
      <button
        @click="copyLink"
        class="text-blue-600 hover:underline"
      >
        Copy Link
      </button>
      <a
        :href="`https://twitter.com/intent/tweet?url=${url}`"
        target="_blank"
        class="text-blue-500 hover:underline"
      >
        X
      </a>
      <a
        :href="`https://www.facebook.com/sharer/sharer.php?u=${url}`"
        target="_blank"
        class="text-blue-700 hover:underline"
      >
        Facebook
      </a>
    </div>

    <!-- Disqus Comments -->
    <DisqusComments :identifier="identifier" :shortname="shortname" />
  </section>
</template>
