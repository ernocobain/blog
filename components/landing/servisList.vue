<script setup lang="ts">
defineProps<{
    servicesLeft: {
        title: string
        description: string
        image: string
    }[]
    servicesRight: {
        title: string
        description: string
        image: string
    }[]
    title: string
    description: string
}>()
</script>

<template>

        <section class="py-16">
            <div class="text-center mb-12 max-w-2xl mx-auto">
                <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
                <p class="text-gray-600">{{ description }}</p>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Left - 2 Large Cards -->
                <div class="flex flex-col gap-6 w-full lg:w-3/4">
                    <div v-for="(service, index) in servicesLeft" :key="'left-' + index"
                        class="bg-white rounded-2xl shadow-md overflow-hidden">
                        <img :src="service.image" alt="service image" class="w-full h-64 object-cover" />
                        <div class="p-6">
                            <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
                            <p class="text-gray-600">{{ service.description }}</p>
                        </div>
                    </div>
                </div>

                <!-- Right - 3 Medium Cards -->
                <div class="w-full lg:w-1/3 flex flex-col gap-6">
                    <div v-for="(service, index) in servicesRight" :key="'right-' + index"
                        class="bg-white rounded-2xl shadow-md overflow-hidden">
                        <img :src="service.image" alt="service image" class="w-full h-44 object-cover" />
                        <div class="p-4">
                            <h4 class="text-lg font-semibold mb-2">{{ service.title }}</h4>
                            <p class="text-gray-600 text-sm">{{ service.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
</template>
