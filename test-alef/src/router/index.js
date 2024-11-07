import { createRouter, createWebHistory } from 'vue-router'
import FormView from '../views/FormView.vue'
import HomePage from "@/views/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/form',
      name: 'Form',
      component: () => import('../views/FormView.vue'),
    },
    {
      path: '/preview',
      name: 'Preview',
      component: () => import('../views/PreviewView.vue'),
    },
  ],
})

export default router
