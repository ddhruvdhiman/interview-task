<template>
  <div class="max-w-4xl mx-auto p-4">
    <h1 class="text-3xl font-extrabold mb-8 text-center text-gray-800 tracking-tight">
      Posts
    </h1>
    <div v-if="store.loading" class="flex justify-center items-center h-64">
      <svg
        class="animate-spin h-10 w-10 text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8z"
        ></path>
      </svg>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <router-link
        v-for="post in store.posts"
        :key="post.id"
        :to="`/posts/${post.id}`"
        class="block transform transition hover:scale-[1.03] hover:shadow-2xl"
      >
        <div
          class="bg-gray-100 rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between border border-gray-100 hover:border-blue-400 transition"
        >
          <div>
            <h2
              class="text-xl font-semibold mb-2 text-blue-700 line-clamp-2"
            >
              {{ post.title }}
            </h2>
            <p class="text-gray-600 mb-4 line-clamp-3">
              {{ post.body }}
            </p>
          </div>
          <div class="flex items-center justify-between mt-4">
            <span class="text-xs text-gray-400">Post #{{ post.id }}</span>
            <span
              class="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium"
            >
              {{ post.tags?.[0] || 'General' }}
            </span>
          </div>
          <!-- Add reactions display here -->
          <div class="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span>
              👍 {{ post.reactions?.likes ?? 0 }}
            </span>
            <span>
              👎 {{ post.reactions?.dislikes ?? 0 }}
            </span>
          </div>
        </div>
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
