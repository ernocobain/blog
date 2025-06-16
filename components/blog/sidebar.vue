<script setup lang="ts">
// Import tipe yang sudah kita definisikan berdasarkan skema koleksi
import type { BlogCollectionItem } from '~/types/blog.d'; // Pastikan path-nya benar

const props = defineProps<{
  latestPosts: BlogCollectionItem[]; // <-- Gunakan tipe ini
  relatedPosts?: BlogCollectionItem[]; // <-- Gunakan tipe ini
  title: string;
  titleRelate?: string;
}>();
</script>

<template>
  <aside class="space-y-10">
    <section>
      <h2 class="text-xl font-semibold mb-4">{{ title }}</h2>
      <ul class="space-y-5">
        <li v-for="post in latestPosts" :key="post._path"> <BlogRealetedPostCard
            :title="post.title"
            :path="post.path ?? post._path" :date="post.date"
            :cover="post.cover"
            :excerpt="post.description ?? post.excerpt"
          />
        </li>
      </ul>
    </section>

    <section v-if="relatedPosts?.length">
      <h2 class="text-xl font-semibold mb-4">{{ titleRelate }}</h2>
      <ul class="space-y-2">
        <li v-for="related in relatedPosts" :key="related._path"> <NuxtLink :to="related.path ?? related._path" class="text-primary hover:underline"> {{ related.title }}
          </NuxtLink>
        </li>
      </ul>
    </section>

    <p v-else-if="relatedPosts" class="text-sm text-gray-500">No related posts found.</p>
  </aside>
</template>