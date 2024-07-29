### 뷰 라우터 (Vue Router)

> 뷰 라우터는 Vue.js 를 이용하여 싱글페이지 애플리케이션 (SPA) 을 구현 할 때 사용하는 Vue.js 의 공식 라우터

<br/>

### Router 란?

> 일반적으로 네트워크 간에 데이터를 전송하는 장치

따라서 뷰에서 말하는 라우터는 URL 에 따라 어떤 페이지를 보여줄지 `Mapping` 해주는 라이브러리

(React 의 router 와 같은 개념)

#### 설치방법

```
npm install vue-router
```

#### 사용방법

1. router > index.js 파일 생성

2. 파일 내 code 작성

```javascript
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/about',
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
```

3. 해당 파일을 ../main.js 에 등록

```javascript
/**
 * 해당하는 createApp 에 method-chain 을 걸어 use 로 route 값을 등록
 */
createApp(App).use(router).mount('#app')
```

4. layouts/TheView.vue 에서 등록 (RouterView)

RouterView 는 vue 에서 제공하는 router 등록 방법

```vue
<template>
  <main>
    <div class="container py-4">
      <!-- RouterView 를 사용하면 해당 routes 에 알맞는 rendering 이 자동으로 적용  -->
      <RouterView></RouterView>
    </div>
  </main>
</template>
```

5. 또한 vue 에서는 Next 처럼 자체적인 `<a/>` 를 제공한다.

```html
<router-link class="nav-link active" to="/">Home</router-link>
<!-- or -->
<RouterLink class="nav-link active" to="/">Home</RouterLink>
```

6. 라우터 내의 정보를 쓰려면 {$route} 로 불러다 쓸 수 있다.

```vue
<template>
  <div>
    <h2>ABOUT VIEW</h2>
    <p>{{ $route.path }}</p>
  </div>
</template>
```

```vue
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>
```

이런식으로도 출력이 가능하다.

<br/>

### active-class

> router 의 link 에 class 를 추가하고 싶을 때 사용하는 속성
>
> default 값 === 'router-link-active'

<br/>

### page 내 props 정의하기

`vue` 에서는 페이지 내에 `props` 를 등록하기 위해선 `defineProps()` 를 사용해 주어야한다.

```vue
<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  createdAt: {
    type: [String, Date, Number]
  }
})
</script>
```

1. 타입을 명시한다.
2. 타입이 여러가지 일 때는 배열의 형태로 나타낸다.
3. 반드시 필요한 값일 경우 required: true

[<< 이전 페이지로 돌아가기](../../README.md)

<br/>

### 404 Not-Found

Vue.js 는 page-routing 을 할 때 정규식(regex) 을 사용할 수 있는데

해당 정규식 사용방법을 통해 404 page, 중첩 route 에 관하여 라우팅 할 수 있다.

![404-notfound-image](./images/image-01.png)

```vue
const routes = [ { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView } ]
```

<br/>

### 중첩된 라우터 (Nested Router)

> 기존에 있던 component 를 중첩하여 routing 처리 할 때 사용

```vue
{ path: '/nested', name: 'Nested', component: NestedView, children: [ { path: 'one', name:
'NestedOne', component: NestedOneView }, { path: 'two', name: 'NestedTwo', component: NestedTwoView
} ] },
```

1. 중첩 할 페이지의 route 의 children 으로 구분하여
2. 해당하는 페이지의 path 정보를 똑같이 추가한다
3. children 의 path 에 `/` 를 추가하면 절대 경로가 되므로 주의

<br/>

### router.replace

> `router.push` 와 같은 역할을 하지만 유일한 차이는 새로운 히스토리 항목에 추가하지 않고 탐색함
