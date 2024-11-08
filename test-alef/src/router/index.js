import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
