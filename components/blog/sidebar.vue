<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'




const props = defineProps<{
  latestPosts: BlogCollectionItem[]
  relatedPosts?: BlogCollectionItem[]
  title: string
  titleRelate?: string
}>()

</script>

<template>
  <aside class="space-y-10">
    <!-- Latest Posts -->
    <section>
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <ul class="space-y-5">
        <li v-for="post in latestPosts" :key="post.path">
          <BlogRealetedPostCard
            :title="post.title"
            :path="post.path"
            :date="post.date"
            :cover="post.cover"
            :excerpt="post.description ?? post.excerpt"
          />
        </li>
      </ul>
    </section>

    <!-- Related Posts -->
    <section v-if="relatedPosts?.length">
      <h2 class="text-xl font-semibold mb-4">{{  titleRelate }}</h2>
      <ul class="space-y-2">
        <li v-for="related in relatedPosts" :key="related.path">
          <NuxtLink :to="related.path" class="text-primary hover:underline">
            {{ related.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <p v-else-if="relatedPosts" class="text-sm text-gray-500">No related posts found.</p>
  </aside>
</template>