import { defineStore } from 'pinia'
import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/posts'
const CACHE_KEY = 'cachedPosts'
const CACHE_TIME = 15 * 60 * 1000 // 15 minutes

export const usePostStore = defineStore('postStore', {
  state: () => ({
    posts: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchPosts() {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY))
      const now = Date.now()

      if (cached && now - cached.timestamp < CACHE_TIME) {
        this.posts = cached.data
        return
      }

      this.loading = true
      try {
        const res = await axios.get(API_URL)
        this.posts = res.data
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: now,
          data: res.data
        }))
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    }
  }
})
