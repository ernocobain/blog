<!-- components/BlogHeroBanner.vue -->
<template>
    <div class="relative w-full bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-12 shadow-md">
        <div class="max-w-3xl">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Temukan Cerita dan Tips Ngoding Terbaru!
            </h1>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
                Jelajahi artikel seputar coding, proyek seru, dan pengalaman pribadi di dunia developer.
            </p>
            <UButton class="mt-6" color="primary" to="/blog/post/postingan-kedua">
                Lihat Postingan Populer
            </UButton>
        </div>
        <!-- Optional: Tambahkan ilustrasi/icon di kanan untuk layar besar -->
        <!-- <img src="/hero-illustration.svg" class="hidden md:block absolute right-8 bottom-0 w-40" /> -->
    </div>
</template>