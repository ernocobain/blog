<script setup lang="ts">
import { ref, computed } from 'vue'
import type { BreadcrumbItem } from '@nuxt/ui'

const postsPerPage = 6
const currentPage = ref(1)
const selectedTag = ref('')

const { data: posts } = await useAsyncData('blog-list', () => {
  return queryCollection('blog')
    .select('title', 'description', 'date', 'path', 'tags', 'cover', 'excerpt', 'coverDesktop', 'coverMobile')
    .all()
})

const { data: allPosts, status: allPostsStatus } = await useAsyncData('all-posts', () =>
  queryCollection('blog').all()
);

const totalPages = computed(() => {
  const filteredPosts = filteredByTag.value
  return filteredPosts ? Math.ceil(filteredPosts.length / postsPerPage) : 1
})

const filteredByTag = computed(() => {
  if (!selectedTag.value) return posts.value || []
  return (posts.value || []).filter(post =>
    post.tags?.includes(selectedTag.value)
  )
})

const paginatedPosts = computed(() => {
  const filteredPosts = filteredByTag.value
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.slice(start, end)
})

const allTags = computed(() => {
  const tags = new Set<string>()
  posts.value?.forEach(post => {
   if (Array.isArray(post.tags)) {
    post.tags.forEach(tag => {
      if (tag !== "popular") tags.add(tag) 
    })
   }
  })
  return [...tags]
})

const popularPosts = computed(() => {
  return allPosts.value?.filter(post =>
    post.tags?.includes('popular')
  ).slice(0, 5) || [];
});

</script>
<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold mb-6">Blog</h1>
    <BlogSearch />
    <BlogHeroBanner />

    <!-- Grid Layout: 2 kolom -->
    <div class="flex flex-col lg:flex-row gap-8 mt-10">
  <!-- Konten Utama -->
  <div class="flex-1">
    <div class="grid md:grid-cols-2 gap-6">
      <NuxtLink v-for="post in paginatedPosts" :key="post.path" :to="post.path">
        <UCard class="hover:ring-2 hover:ring-primary transition cursor-pointer">
          <BlogPostCard :title="post.title" :path="post.path" :date="post.date" :cover="{
            mobile: post.coverMobile ?? post.cover,
            desktop: post.coverDesktop ?? post.cover
          }" :excerpt="post.description ?? post.excerpt" />
        </UCard>
      </NuxtLink>
    </div>

    <!-- Tags dan Pagination bisa tetap di bawah konten utama -->
    <div class="flex gap-2 my-6 flex-wrap">
      <h4>Tags</h4>
      <UButton v-for="tag in allTags" :key="tag" :variant="selectedTag === tag ? 'solid' : 'soft'" color="primary"
        size="sm" @click="selectedTag = tag">
        {{ tag }}
      </UButton>
    </div>

    <div class="flex justify-center items-center gap-4 mt-10">
      <UButton icon="i-heroicons-chevron-left" color="neutral" variant="ghost" :disabled="currentPage <= 1"
        @click="currentPage--">
        Prev
      </UButton>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <UButton icon="i-heroicons-chevron-right" iconPosition="trailing" color="neutral" variant="ghost"
        :disabled="currentPage >= totalPages" @click="currentPage++">
        Next
      </UButton>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="w-full lg:w-auto">
    <BlogSidebar :latest-posts="popularPosts" title="Postingan Popular" width=""/>
  </div>
</div>

  </UContainer>
</template>

