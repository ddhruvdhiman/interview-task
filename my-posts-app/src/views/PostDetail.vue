<template>
  <div class="max-w-2xl mx-auto p-4">
    <router-link to="/posts" class="text-blue-500 underline">← Back to Posts</router-link>
    <div v-if="!post" class="text-center mt-10">Loading post...</div>
    <div v-else class="mt-4">
      <h2 class="text-3xl font-bold mb-2">{{ post.title }}</h2>
      <p class="text-gray-700 mt-4 mb-4">{{ post.body }}</p>
      <div class="mb-2">
        <span class="font-semibold">Tags: </span>
        <span v-if="post.tags && post.tags.length">
          <span
            v-for="(tag, idx) in post.tags"
            :key="tag"
            class="inline-block bg-gray-200 rounded px-2 py-1 text-xs mr-2"
          >
            {{ tag }}<span v-if="idx < post.tags.length - 1">, </span>
          </span>
        </span>
        <span v-else class="text-gray-400">No tags</span>
      </div>
      <div>
        <span v-if="typeof post.reactions === 'object' && post.reactions !== null">
          <span class="text-green-600 font-semibold"><span class="like">Likes: </span>{{ post.reactions.likes }}</span>
          <span class="text-red-600 font-semibold space"><span class="dislike">Dislikes: </span> {{ post.reactions.dislikes }}</span>
        </span>
        <span v-else>
          {{ post.reactions }}
        </span>
      </div>
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
<style>
.space {
  margin-left: 10px;
}
.like{
    color:green
}
.dislike{
    color:red
}
</style>
