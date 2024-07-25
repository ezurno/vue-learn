import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  }
]

/**
 * router 를 생성한다.
 * 해당 router 에는 object 를 갖는데
 * 해당 object 는 history 와 routes 를 갖는다.
 *
 * history 로는 주로 createWebHistory 의 반환값을 받음
 * => 매개변수로 준 router 로 부터의 history
 * routes 는 라우터 목록
 */
const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// 외부로
export default router
