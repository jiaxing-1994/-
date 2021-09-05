import { createRouter, createWebHashHistory } from 'vue-router'
import Menu from '../views/menu.vue';
import NoHouse from '../views/previewCode/noHouse.vue';
import Normal from '../views/previewCode/normal.vue';
import AlipayIdCard from '../views/idCard/alipayIdCard.vue';

const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/NoHouse',
    name: 'NoHouse',
    component: NoHouse
  },
  {
    path: '/Normal',
    name: 'Normal',
    component: Normal
  },
  {
    path: '/AlipayIdCard',
    name: 'AlipayIdCard',
    component: AlipayIdCard
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
