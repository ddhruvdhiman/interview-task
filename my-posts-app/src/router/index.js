import { createRouter, createWebHistory } from 'vue-router'
import Posts from '../views/Posts.vue'
import PostDetail from '../views/PostDetail.vue'

const routes = [
  { path: '/', redirect: '/posts' },
  { path: '/posts', component: Posts },
  { path: '/posts/:id', component: PostDetail, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
