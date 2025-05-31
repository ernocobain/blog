<script setup lang="ts">
const portfolioItems = [
    { image: 'https://placehold.co/400', alt: 'Pengerjaan pondasi rumah di Depok' },
    { image: 'https://placehold.co/400', alt: 'Perataan tanah kabel bawah tanah' },
    { image: 'https://placehold.co/400', alt: 'Proyek pembangunan dinding batako' },
    { image: 'https://placehold.co/400', alt: 'Penggalian jalur kabel' },
    { image: 'https://placehold.co/400', alt: 'Tukang sedang menyemen halaman' },
    { image: 'https://placehold.co/400', alt: 'Pemasangan paving block halaman' },
]

</script>

<template>
    <section class="px-4 py-12 md:py-20 bg-white">
        <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Portofolio Proyek Kami</h2>
            <p class="text-gray-500 mb-10">Beberapa dokumentasi pekerjaan kami yang telah selesai dengan rapi dan tepat
                waktu.</p>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div v-for="(item, i) in portfolioItems" :key="i">
                    <img :src="item.image" :alt="item.alt"
                        class="rounded-xl shadow-md object-cover w-full h-40 md:h-56" />
                </div>
            </div>
        </div>
    </section>

</template>