<template>
  <div class="p-4 border rounded-lg shadow hover:bg-gray-50 cursor-pointer transition">
    <h2 class="text-xl font-semibold">{{ post.title }}</h2>
    <p class="text-gray-600 mt-2">{{ post.body }}</p>
  </div>
</template>

<script setup>
defineProps(['post'])
</script>
