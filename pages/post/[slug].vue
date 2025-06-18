<script setup lang="ts">
import { ContentImageRenderer } from '#components';
import FacebookComents from '~/components/blog/FacebookComents.vue';
import WhatsappButton from '~/components/blog/WhatsappButton.vue';

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
    <template v-if="postStatus !== 'success' || !post">
      <p v-if="postStatus === 'pending'">Sedang memuat artikel...</p>
      <p v-else>Artikel tidak ditemukan atau terjadi kesalahan.</p>
    </template>

    <template v-else>
      <div class="flex flex-col lg:flex-row gap-x-12 gap-y-8">
        <main class="lg:w-2/3">
          <article>
            <div class="space-y-4 mb-6">
              <UBreadcrumb :items="[
                { label: 'Home', to: '/' },
                { label: 'Blog', to: '/blog' },
                { label: post.title, disabled: true }
              ]" />
              <h1 class="text-3xl lg:text-4xl font-bold tracking-tight">{{ post.title }}</h1>
              <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Diterbitkan pada {{ new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric', month:
                    'long', year: 'numeric' }) }}</span>
                <span v-if="readingTime">· {{ readingTime }}</span>
              </div>
              <div v-if="post.tags?.length" class="flex gap-2 flex-wrap">
                <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="soft">{{ tag }}</UBadge>
              </div>
            </div>

            <ContentRenderer :value="post.body" class="prose dark:prose-invert max-w-none"
              :components="{ img: ContentImageRenderer }" />
          </article>

          <div class="my-12 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <h2 class="text-xl font-bold mb-2">Punya Pertanyaan atau Butuh Jasa Kami?</h2>
            <p class="mb-4 text-gray-600 dark:text-gray-300">Jangan ragu, langsung diskusikan proyek Anda dengan kami.
            </p>
            <WhatsappButton phone-number="6285156436826"
              :message="`Halo, saya tertarik dengan jasa bangunan setelah membaca artikel '${post.title}'.`" />
          </div>

          <div class="mt-12">
            <h3 class="text-2xl font-bold mb-4">Diskusi dan Tanya Jawab</h3>
            <ClientOnly>
              <FacebookComents :path="route.path" />
            </ClientOnly>
          </div>
        </main>

        <aside class="lg:w-1/3">
          <BlogSidebar :latest-posts="latestPosts" title="Postingan Terakhir" :related-posts="relatedPosts"
            title-relate="Artikel Terkait" />
        </aside>
      </div>
    </template>
  </UContainer>
</template>