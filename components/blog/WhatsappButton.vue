<template>
  <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer" class="no-underline">
    <UButton
      icon="i-simple-icons-whatsapp"
      size="xl"
      color="success"
      variant="solid"
      label="Konsultasi Gratis via WhatsApp"
      block
    />
  </a>
</template>

<script setup lang="ts">
const props = defineProps({
  // Nomor telepon format internasional tanpa '+' atau '0' di depan
  // Contoh: 6281234567890
  phoneNumber: {
    type: String,
    required: true,
  },
  // Pesan default yang akan muncul di WhatsApp
  message: {
    type: String,
    default: 'Halo, saya tertarik dengan jasa bangunan Anda.',
  },
});

// Membuat URL WhatsApp yang valid
const whatsappUrl = computed(() => {
  const encodedMessage = encodeURIComponent(props.message);
  return `https://wa.me/${props.phoneNumber}?text=${encodedMessage}`;
});
</script>