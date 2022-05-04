import { createRouter, createWebHashHistory } from 'vue-router'

import Product from '@/components/Product.vue'
import Update from '@/components/Update.vue'
import Detail from '@/components/Detail.vue'


// 페이지 추가될 때마다 설정

const router = createRouter({
  // 뒤로가기용
  history: createWebHashHistory(),
  routes: [
    // route 페이지가 설정되는 곳
    // routers 객체에는 항상 path, name, component가 있어야 하며,
    // name, path를 다른 name, path와 동일하게 설정하면 안된다.(router 오류 발생)
    // child를 선언하고 하위 router를 구성 가능
    // 목록
    {
      path: '/',
      name: 'product',
      component: Product,
    },
    // 수정
    {
      path: '/update',
      name: 'update',
      component: Update,
    },
    // 상세
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
    }
  ]
})

export default router