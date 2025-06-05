<template>
  <div class="max-w-2xl mx-auto p-4">
    <router-link to="/posts" class="text-blue-500 underline">← Back to Posts</router-link>
    <div v-if="!post" class="text-center mt-10">Loading post...</div>
    <div v-else class="mt-4">
      <h2 class="text-3xl font-bold">{{ post.title }}</h2>
      <p class="text-gray-700 mt-4">{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const post = ref(null)
const route = useRoute()

onMounted(async () => {
  const res = await axios.get(`https://dummyjson.com/posts/${route.params.id}`)
  post.value = res.data
})
</script>
