import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import funcPlugins from './plugins/func'
import objPlugins from './plugins/obj'
import person from './plugins/person'
import 'bootstrap/dist/js/bootstrap.js'
import focus from './directives/focus'
import globalDirectives from './plugins/global-directives'
import dayjs from './plugins/dayjs'

/**
 * 해당하는 createApp 에 method-chain 을 걸어 use 로 route 값을 등록
 */
createApp(App)
  .directive('focus', focus)
  .use(funcPlugins)
  .use(dayjs)
  .use(globalDirectives)
  .use(objPlugins, { name: 'TEST' })
  .use(person)
  .use(router)
  .mount('#app')
