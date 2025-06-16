// types/blog.d.ts

// Penting: Pastikan path ini benar menuju file content.config.ts Anda
import type contentConfig from '~/content.config';
import type { Infer } from '@nuxt/content/dist/runtime/types'; // Import Infer

// Ini adalah tipe yang akan merepresentasikan item dari koleksi 'blog'
// berdasarkan skema yang Anda definisikan di content.config.ts
// dan akan secara otomatis menyertakan properti bawaan Nuxt Content
export type BlogCollectionItem = Infer<typeof contentConfig.collections.blog.schema>;

// Untuk komponen BlogRelatedPostCard, kita bisa membuat tipe yang lebih spesifik jika diperlukan
// Tergantung properti apa saja yang diakses oleh komponen tersebut
export interface BlogRelatedPostCardProps {
  title: string;
  path: string; // Properti 'path' ini biasanya adalah _path dari Nuxt Content
  date: string;
  cover?: string;
  excerpt?: string;
  // Tambahkan properti lain yang memang di-pass ke BlogRelatedPostCard jika ada
}