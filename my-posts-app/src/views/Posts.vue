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
    <div v-else class="grid grid-cols-2 gap-8">
      <router-link
        v-for="post in store.posts"
        :key="post.id"
        :to="`/posts/${post.id}`"
        class="block transform transition hover:scale-[1.03] hover:shadow-2xl"
      >
        <el-card
          :header="post.title"
          class="rounded-xl shadow-xl border-0 bg-gray-50 hover:bg-gray-100 transition-all duration-300 h-full flex flex-col justify-between premium-card"
        >
          <div class="flex items-center gap-3 mb-2">
            <!-- Remove title from here, keep only the tag badge -->
            <span
              class="inline-block bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow"
            >
              {{ post.tags?.[0] || 'General' }}
            </span>
          </div>
          <p class="text-gray-700 mb-6 text-base leading-relaxed line-clamp-4">
            {{ post.body }}
          </p>
          <div class="flex items-center justify-between mt-auto pt-4 border-t border-blue-100">
            <div class="flex items-center gap-4 text-xs text-gray-500">
              <span class="flex items-center gap-1">
                <span class="inline-block w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  👍
                </span>
                <span class="font-semibold">{{ post.reactions?.likes ?? 0 }}</span>
              </span>
              <span class="flex items-center gap-1">
                <span class="inline-block w-5 h-5 bg-red-100 text-red-500 rounded-full flex items-center justify-center shadow-sm">
                  👎
                </span>
                <span class="font-semibold">{{ post.reactions?.dislikes ?? 0 }}</span>
              </span>
            </div>
            <span class="text-xs text-gray-400 font-mono">#{{ post.id }}</span>
            <span
              class="ml-2 inline-block px-3 py-1 bg-blue-500 text-white rounded-lg font-medium text-xs shadow hover:bg-blue-600 transition"
              >
              Read More
            </span>
          </div>
        </el-card>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { usePostStore } from '../stores/postStore'
import { ElCard } from 'element-plus'
import 'element-plus/es/components/card/style/css'

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

<style scoped>
.premium-card {
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10), 0 1.5px 4px 0 rgba(0,0,0,0.04);
  border: 1.5px solid rgba(30, 64, 175, 0.08);
  transition: box-shadow 0.3s, border-color 0.3s;
}
.premium-card:hover {
  box-shadow: 0 16px 40px 0 rgba(31, 38, 135, 0.18), 0 4px 12px 0 rgba(0,0,0,0.08);
  border-color: #3b82f6;
}
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
