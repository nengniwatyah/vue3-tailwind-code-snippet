import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/CardPage.vue'
import LayoutAside from '../views/LayoutAside.vue'
import UiLibrary from '../views/UiLibrary.vue'

const routes = [
  {
    path: '/',
    redirect: '/ui-library'
  },
  {
    path: '/card',
    name: 'card',
    component: Home
  },
  {
    path: '/card-counter',
    name: 'card-counter',
    component: () => import('../views/CardCounterPage.vue')
  },
  {
    path: '/status-tag',
    name: 'status-tag',
    component: () => import('../views/StatusTagPage.vue')
  },
  {
    path: '/layout-aside',
    name: 'layout-aside',
    component: LayoutAside
  },
  {
    path: '/aside-bar',
    name: 'aside-bar',
    component: () => import('../views/AsideBarPage.vue')
  },
  {
    path: '/ui-library',
    name: 'ui-library',
    component: UiLibrary
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
