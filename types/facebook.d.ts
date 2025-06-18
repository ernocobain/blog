// File: types/facebook.d.ts

// Mendefinisikan bentuk (shape) dari objek FB yang kita gunakan
interface FBApi {
  init: (params: {
    appId: string;
    xfbml: boolean;
    version: string;
  }) => void;
  XFBML: {
    parse: () => void;
  };
}

// Memberitahu TypeScript secara global bahwa interface Window sekarang
// memiliki properti fbAsyncInit dan FB.
declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: FBApi;
  }
}

// Baris ini penting untuk memastikan file ini diperlakukan sebagai module
export {};