<script setup lang="ts">
const route = useRoute();
const slug = route.params.slug;

// Fetch post and all posts in parallel
const { data: post, status: postStatus } = await useAsyncData(`post-${slug}`, () =>
  queryCollection('blog')
    .where('path', '=', `/blog/post/${slug}`)
    .first()
);

const { data: allPosts, status: allPostsStatus } = await useAsyncData('all-posts', () =>
  queryCollection('blog').all()
);

// Related Posts based on tags
const relatedPosts = computed(() => {
  if (!post.value || !allPosts.value) return [];
  const currentTags = Array.isArray(post.value.tags) ? post.value.tags : [];
  if (currentTags.length === 0) return [];

  return allPosts.value
    .filter((p) => p.path !== post.value?.path) // Skip current post
    .filter((p) =>
      (Array.isArray(p.tags) ? p.tags : []).some((tag) => currentTags.includes(tag))
    )
    .slice(0, 5);
});

// Latest Posts
const latestPosts = computed(() => {
  return allPosts.value?.slice(0, 3) || [];
});

// Reading Time (using the method you provided)
function extractTextMinimal(value: any[]): string {
  return value
    .map(item => {
      if (Array.isArray(item) && typeof item[2] === 'string') {
        return item[2]
      }
      return ''
    })
    .join(' ')
}

interface MinimalContent {
  type: 'minimal'
  value: any[]
}

const readingTime = computed(() => {
  const body = post.value?.body as MinimalContent | undefined
  if (!body || !Array.isArray(body.value)) return ''

  const text = extractTextMinimal(body.value)
  const wordCount = text.trim().split(/\s+/).length
  const minutes = Math.ceil(wordCount / 200)

  return `${minutes} menit baca`
});

// SEO meta
if (post.value) {
  useSeoMeta({
    title: post.value.title,
    description: post.value.description ?? post.value.excerpt ?? '',
    ogTitle: post.value.title,
    ogDescription: post.value.description ?? post.value.excerpt ?? '',
    ogType: 'article',
  });
}
</script>

<template>
  <UContainer class="py-8">
    <template v-if="postStatus === 'pending'">
      <p>Loading post...</p>
    </template>
    <template v-else-if="postStatus === 'error'">
      <p>Error loading post</p>
    </template>
    <template v-else-if="post">
      <UBreadcrumb :items="[
        { label: 'Home', to: '/' },
        { label: 'Blog', to: '/blog' },
        { label: post.title }
      ]" class="mb-6" />

      <div class="flex flex-col lg:flex-row gap-12">
        <!-- Main Content -->
        <div class="flex-1">
          <div class="space-y-6">
            <h1 class="text-3xl font-bold">{{ post.title }}</h1>

            <!-- Tags Section -->
            <div v-if="post.tags?.length" class="flex gap-2 flex-wrap mb-4">
              <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="soft">
                {{ tag }}
              </UBadge>
            </div>
            <div v-else class="text-sm text-gray-500 mb-4">
              No tags available
            </div>

            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ new Date(post.date).toLocaleDateString() }}
            </p>
            <ContentRenderer :value="post.body" class="prose dark:prose-invert" />
          </div>

          <!-- Reading Time -->
          <div v-if="readingTime" class="mt-6 text-sm text-gray-500">
            <p>Reading Time: {{ readingTime }}</p>
          </div>
        </div>
        <div>

          <template v-if="post && post._id && route.fullPath">
            <client-only>
              <BlogDisqusCard :url="`https://maunguli.com/${route.fullPath}`" :identifier="post._id"
                shortname="maunguli" />
            </client-only>
          </template>
        </div>
       <BlogSidebar  :latest-posts="latestPosts" title="Postingan Terakhir" :related-posts="relatedPosts" title-relate="Related Post"/>
      </div> 
    </template>
    <template v-else>
      <p>Post not found</p>
    </template>
  </UContainer>
</template>

<style scoped>
.prose {
  max-width: 100%;
  font-size: 1rem;
  line-height: 1.7;
}

.dark .prose {
  color: #e0e0e0;
}

.prose a {
  color: #1e90ff;
  text-decoration: underline;
}

.text-primary {
  color: #1e90ff;
}

.hover\:underline:hover {
  text-decoration: underline;
}
</style>
