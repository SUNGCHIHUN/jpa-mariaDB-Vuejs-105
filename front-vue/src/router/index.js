import { createRouter, createWebHashHistory } from 'vue-router'

import Product from '@/components/Product.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'product',
      component: Product,
    },
  ]
})

export default router