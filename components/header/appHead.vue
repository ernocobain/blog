<template>
  <header class="bg-white dark:bg-gray-900 shadow-sm py-4">
    <UContainer class="flex justify-between items-center">
      <!-- Logo -->
      <a href="/" target="_blank" rel="noopener noreferrer"
        class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary transition-colors duration-200">
        <NuxtImg src="/favicon-96x96.png" alt="Logo" width="27" height="27" class=" text-primary" />
        Maunguli Blog
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden lg:block">
        <ul class="flex gap-8">
          <li>
            <a href="https://maunguli.com" target="_blank" rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
              Home
            </a>
          </li>
          <li>
            <ULink to="/" active-class="text-primary"
              inactive-class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
              Blog
            </ULink>
          </li>
          <li>
            <a href="https://maunguli.com/about" target="_blank" rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
              About
            </a>
          </li>
          <li>
            <a href="https://maunguli.com/contact" target="_blank" rel="noopener noreferrer"
              class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Theme Toggle (Client Only) -->
        <ClientOnly>
          <UButton icon="i-heroicons-sun" color="neutral" variant="ghost" aria-label="Theme toggle" @click="toggleDark"
            v-if="isDark" />
          <UButton icon="i-heroicons-moon" color="neutral" variant="ghost" aria-label="Theme toggle" @click="toggleDark"
            v-else />
        </ClientOnly>

        <!-- Mobile Menu Button -->
        <UButton icon="i-heroicons-bars-3" color="neutral" variant="ghost" class="lg:hidden" aria-label="Open sidebar"
          @click="isSidebarOpen = true" />
      </div>
    </UContainer>

    <!-- Mobile Sidebar -->
    <USlideover v-model:open="isSidebarOpen" side="left" title="'Menu'" description="Menu drawer">
      <template #content>
        <UCard >
          <div class="flex items-center justify-between pb-4">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Menu</h3>
            <UButton icon="i-heroicons-x-mark-20-solid" color="neutral" variant="ghost" class="-my-1"
              @click="isSidebarOpen = false" />
          </div>

          <nav class="space-y-1 divide-y divide-gray-200 dark:divide-gray-700">
            <ul class="space-y-2 pt-2">
              <li>
                <a href="https://maunguli.com"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  @click="isSidebarOpen = false">
                  <UIcon name="i-heroicons-home" class="w-5 h-5 text-primary" />
                  <span class="text-gray-800 dark:text-white">Home</span>
                </a>
              </li>
              <li>
                <ULink to="/"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  active-class="text-primary font-semibold" inactive-class="text-gray-700 dark:text-gray-300"
                  @click="isSidebarOpen = false">
                  <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-primary" />
                  Blog
                </ULink>
              </li>
              <li>
                <a href="https://maunguli.com/about"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  @click="isSidebarOpen = false">
                  <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-primary" />
                  <span class="text-gray-800 dark:text-white">About</span>
                </a>
              </li>
              <li>
                <a href="https://maunguli.com/contact"
                  class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  @click="isSidebarOpen = false">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-primary" />
                  <span class="text-gray-800 dark:text-white">Contact</span>
                </a>
              </li>
            </ul>
          </nav>
        </UCard>
      </template>
    </USlideover>
  </header>
</template>

<script setup lang="ts">
import { NuxtImg } from '#components'
import { ref, computed } from 'vue'

const isSidebarOpen = ref(false)

const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const toggleDark = () => {
  isDark.value = !isDark.value
}
</script>
