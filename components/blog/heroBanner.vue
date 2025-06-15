<!-- components/BlogHeroBanner.vue -->
<template>
    <div class="relative w-full h-[320px] lg:h-[250px] bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 mb-12 shadow-md">
        <div class="max-w-3xl">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Temukan tips dan trik menarik di blog maunguli!
            </h1>
            <p class="mt-4 text-gray-600 dark:text-gray-300">
                Jelajahi artikel seputar kegiatan proyek bangunan dan kegiatan kami bekerja di sini.
            </p>
            <UButton class="mt-6" color="primary" to="/post/pemasangan-topian-pada-jendela">
                Lihat Postingan Populer
            </UButton>
        </div>
        <!-- Optional: Tambahkan ilustrasi/icon di kanan untuk layar besar -->
        <!-- <img src="/hero-illustration.svg" class="hidden md:block absolute right-8 bottom-0 w-40" /> -->
    </div>
</template>