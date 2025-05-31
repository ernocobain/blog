<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui'

const props = defineProps<{
  items: BreadcrumbItem[]
  separatorIcon?: string
}>()
</script>

<template>
  <UBreadcrumb :items="items" :separator-icon="separatorIcon ?? 'i-lucide-chevron-right'" />
</template>
