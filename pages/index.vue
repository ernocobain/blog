<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const postsPerPage = 6
const currentPage = ref(1)
const selectedTag = ref('')

// Konsolidasi pengambilan data: Ambil semua properti yang dibutuhkan oleh Blog Post Card DAN popularPosts
const { data: allBlogPosts, status: blogPostsStatus } = await useAsyncData('all-blog-posts', () =>
  queryCollection('blog')
    .select('title', 'description', 'date', 'path', 'tags', 'cover', 'excerpt', 'coverDesktop', 'coverMobile')
    .all()
);

// Gunakan computed property untuk mengakses data agar lebih reaktif dan aman dari null
const posts = computed(() => allBlogPosts.value || []);

const totalPages = computed(() => {
  const filteredPosts = filteredByTag.value
  return filteredPosts ? Math.ceil(filteredPosts.length / postsPerPage) : 1
})

const filteredByTag = computed(() => {
  if (!selectedTag.value) return posts.value
  return posts.value.filter(post =>
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
  posts.value.forEach(post => { // Menggunakan 'posts.value' yang sudah dikonsolidasi
    if (Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag !== "popular") tags.add(tag) // Pastikan tag 'popular' tidak muncul sebagai filter
      })
    }
  })
  return [...tags].sort() // Urutkan tag secara alfabetis
})

const popularPosts = computed(() => {
  return posts.value.filter(post => // Menggunakan 'posts.value'
    post.tags?.includes('popular')
  ).slice(0, 5) || []; // Ambil 5 postingan popular pertama
});

// Watcher untuk scroll ke atas saat paginasi atau filter tag berubah
watch([currentPage, selectedTag], () => {
  if (process.client) { // Pastikan hanya dijalankan di sisi klien
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// SEO Meta untuk halaman blog
useSeoMeta({
  title: 'Blog Maunguli - tips dan trik seputar proyek bangunan',
  description: 'Temukan artikel terbaru seputar tukang bangunan, desain interior, dan teknik konstruksi',
  ogTitle: 'Blog Maunguli',
  ogDescription: 'Temukan artikel terbaru seputar Tukang bangunan, desain interior, dan teknik konstruksi',
  // Anda bisa menambahkan ogImage, twitterCard, dll. jika ada
})
</script>

<template>
  <UContainer class="py-8">
    <BlogSearch />
    <BlogHeroBanner />

    <div class="flex flex-col lg:flex-row gap-8 mt-10">
      <div class="flex-1">
        <template v-if="blogPostsStatus === 'pending'">
          <div class="grid md:grid-cols-2 gap-6">
            <UCard v-for="i in postsPerPage" :key="i" class="p-6">
              <USkeleton class="h-48 w-full mb-4" />
              <USkeleton class="h-6 w-3/4 mb-2" />
              <USkeleton class="h-4 w-full mb-2" />
              <USkeleton class="h-4 w-1/2" />
            </UCard>
          </div>
          <UProgress animation="swing" class="mt-8" />
        </template>
        <template v-else-if="blogPostsStatus === 'success' && paginatedPosts.length > 0">
          <div class="grid md:grid-cols-2 gap-6">
            <NuxtLink v-for="post in paginatedPosts" :key="post.path" :to="post.path">
              <UCard class="hover:ring-2 hover:ring-primary transition cursor-pointer">
                <BlogPostCard
                  :title="post.title"
                  :path="post.path"
                  :date="post.date ?? ''"
                  :cover="{
                    mobile: post.coverMobile ?? post.cover,
                    desktop: post.coverDesktop ?? post.cover
                  }"
                  :excerpt="post.description ?? post.excerpt"
                />
              </UCard>
            </NuxtLink>
          </div>
        </template>
        <template v-else-if="blogPostsStatus === 'success' && paginatedPosts.length === 0">
          <p class="text-gray-500 text-center text-lg mt-8">Tidak ada postingan yang ditemukan dengan filter ini.</p>
        </template>
        <template v-else>
          <p class="text-red-500 text-center text-lg mt-8">Terjadi kesalahan saat memuat postingan. Silakan coba lagi nanti.</p>
        </template>

        <div class="flex gap-2 my-6 flex-wrap items-center">
          <h4 class="font-semibold text-lg mr-2">Tags:</h4>
          <UButton
            :variant="!selectedTag ? 'solid' : 'soft'"
            color="primary"
            size="sm"
            @click="selectedTag = ''"
          >
            Semua
          </UButton>
          <UButton
            v-for="tag in allTags"
            :key="tag"
            :variant="selectedTag === tag ? 'solid' : 'soft'"
            color="primary"
            size="sm"
            @click="selectedTag = tag"
          >
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

      <div class="w-full lg:w-auto"> <template v-if="blogPostsStatus === 'pending'">
          <UCard class="p-6">
            <USkeleton class="h-6 w-1/2 mb-4" />
            <USkeleton class="h-24 w-full mb-2" v-for="i in 3" :key="i"/>
          </UCard>
        </template>
        <template v-else-if="blogPostsStatus === 'success' && popularPosts.length > 0">
          <BlogSidebar :latest-posts="popularPosts" title="Postingan Popular" />
        </template>
        <template v-else>
          <p class="text-gray-500 text-center">Tidak ada Postingan Popular.</p>
        </template>
      </div>
    </div>
  </UContainer>
</template>