<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Posts</h1>
    <div v-if="store.loading">Loading...</div>
    <div v-else class="grid gap-4">
      <router-link
        v-for="post in store.posts"
        :key="post.id"
        :to="`/posts/${post.id}`"
      >
        <PostCard :post="post" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import PostCard from '../components/PostCard.vue'

const store = usePostStore()

onMounted(async () => {
  store.loading = true
  try {
    const res = await fetch('https://dummyjson.com/posts')
    const data = await res.json()
    store.posts = data.posts // Assign only the posts array
  } catch (e) {
    // Optionally handle error
    store.posts = []
  } finally {
    store.loading = false
  }
})
</script>
