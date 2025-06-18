<script setup lang="ts">
import { ContentImageRenderer } from '#components';
import FacebookComents from '~/components/blog/FacebookComents.vue';

const route = useRoute();
const slug = route.params.slug;

// Fetch post and all posts in parallel
const { data: post, status: postStatus } = await useAsyncData(`${slug}`, () =>
  queryCollection('blog')
    .where('path', '=', `/post/${slug}`)
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
      <p>Error loading post. Mohon coba lagi.</p>
    </template>

    <template v-else-if="!post">
      <p>Post not found.</p>
    </template>

    <template v-else>
      <UBreadcrumb :items="[
        { label: 'Home', to: '/' },
        { label: post.title }
      ]" class="mb-6" />

      <div class="flex flex-col lg:flex-row gap-12">
        <div class="lg:w-2/3">
          <article class="space-y-6">
            <h1 class="text-3xl font-bold tracking-tight">{{ post.title }}</h1>

            <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>{{ new Date(post.date).toLocaleDateString() }}</span>
              <span v-if="readingTime">· {{ readingTime }}</span>
            </div>

            <div v-if="post.tags?.length" class="flex gap-2 flex-wrap">
              <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="soft">
                {{ tag }}
              </UBadge>
            </div>

            <ContentRenderer :value="post.body" class="prose dark:prose-invert max-w-none"
              :components="{ img: ContentImageRenderer }" />
          </article>

          <div class="mt-12">
            <ClientOnly>
              <div class="mt-12">
                <h3 class="text-2xl font-bold mb-4">Diskusi dan Tanya Jawab</h3>
                <ClientOnly>
                  <FacebookComents :url="route.path" />
                </ClientOnly>
              </div>
            </ClientOnly>
          </div>
        </div>

        <div class="lg:w-1/3">
          <BlogSidebar :latest-posts="latestPosts" title="Postingan Terakhir" :related-posts="relatedPosts"
            title-relate="Related Post" />
        </div>
      </div>
    </template>
  </UContainer>
</template>
