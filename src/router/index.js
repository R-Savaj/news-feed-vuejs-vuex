import { createRouter, createWebHashHistory } from 'vue-router'
import NewsList from '@/components/Task1/NewsList.vue'
import AddEditNews from '@/components/Task1/AddEditNews.vue'
const routes = [
  {
    path: '/news',
    component: NewsList
  },
  {
    path: '/add-news',
    component: AddEditNews
  },
  {
    path: '/edit-news/:id',
    name:'edit',
    component: AddEditNews
  },
  {
    path: '/class',
    component: () => import('../views/Class.vue')
  },
  {
    path: '/student',
    component: () => import('../views/Student.vue')
  },
  {
    path: '/teacher',
    component: () => import('../views/Teacher.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
