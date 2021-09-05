import { createRouter, createWebHistory } from 'vue-router'
import Menu from '../views/menu.vue';
import NoHouse from '../views/previewCode/noHouse.vue';
import Normal from '../views/previewCode/normal.vue';

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
