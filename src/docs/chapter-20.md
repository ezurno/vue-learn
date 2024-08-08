## Vue Router

### 뷰 라우터 (Vue Router)

> Vue.js 를 이용하여 싱글 페이지 애플리케이션 (SPA) 를 구현할 때 사용하는 Vue.js 의 공식 라우터

<br/>

### Router 란?

> 라우터라고 하면 일반적으로 네트워크간에 데이터를 전송하는 장치를 말함

따라서 뷰에서 말하는 라우터는 URL 에 따라 어떤 페이지를 보여줄지 매핑해주는 라이브러리

<br/>

### Route 란?

> 어떤 URL 에 대해 어떤 페이지를 표시해야 하는지에 대한 정보

<br/>

### 설치 방법

```
npm install vue-router
```

<br/>

### 사용 방법

#### 페이지 컴포넌트 생성

```vue
// src/views/HomeView.vue
<script setup></script>
<template>
  <h1>Home Page</h1>
</template>
```

```vue
// src/views/AboutView.vue
<script setup></script>
<template>
  <h1>About Page</h1>
</template>
```

<br/>

#### 라우트 정의

먼저 URL 요청에 대해 어떤 페이지를 보여줄지에 대한 매핑정보 정의

```javascript
// src/router/index.js
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: HomeView
  },
  {
    path: '/about',
    name: 'about',
    components: AboutView
  }
]
```

<br/>

#### 라우터 설정

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: HomeView
  },
  {
    path: '/about',
    name: 'about',
    components: AboutView
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
```

후 설정한 라우터 객체를 Vue 인스턴스에 추가

```javascript
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

`app.use(router)` 를 호출함으로써 컴포넌트 내부에서 `$router`, `$route` 객체에 접근할 수 있음

<br/>

### 네비게이션

```vue
// src/App.vue
<script setup></script>

<template>
  <nav>
    <RouterLink to="/">HOME</RouterLink>
    <span>|</span>
    <RouterLink to="/about">ABOUT</RouterLink>
  </nav>
  <main>
    <RouterView></RouterView>
  </main>
</template>
```

- `<RouterLink>`

Vue Router 에서는 페이지를 이동할 때 일반 `a` 태그를 사용하는 대신 커스텀 컴포넌트인 `<RouterLink>` 를 사용하여 다른 페이지 링크를 만들어야 함

이를 통해 **Vue Router 는 페이지를 리로딩(새로고침) 하지 않고 URL 에 매핑된 페이지를 렌더링** 할 수 있음

- `<RouterView>`

`<RouterView>` 는 URL 에 매핑된 컴포넌트를 화면에 표시

<br/>

`router` 를 설정할 때 `app.use(router)` 를 호출. 이렇게 호출 함으로써 모든 자식 컴포넌트에 `router`, `route` 같은 객체 사용 가능

또한 이러한 객체는 페이지 이동 또는 현재 활성 라우트(경로 매핑) 정보에 접근하는 데 사용할 수 있음

- router

  - 라우터 인스턴스로 JavaScript 에서 다른 페이지 컴포넌트로 이동할 수 있음
  - Options API : this.$router
  - Composition API : useRouter()
  - template : $router

- route
  - 현재 활성 라우트 정보에 접근할 수 있음 (읽기전용)
  - Options API : this.$route
  - Composition API : useRoute()
  - template : $route

```vue
// HomeView.vue
<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
console.log('route.name: ', route.name)
console.log('route.path: ', route.path)
const goAboutPage = () => {
  router.push('/about')
}
</script>
<template>
  <h1>HOME PAGE</h1>
  <button @click="goAboutPage">ABOUT 페이지 이동</button>
</template>
```

```vue
// AboutView.vue
<script setup></script>
<template>
  <h1>About Page</h1>
  <ul>
    <li>$route.name : {{ $route.name }}</li>
    <li>$route.path : {{ $route.path }}</li>
  </ul>
  <button @click="$router.push('/')">HOME PAGE 로 이동</button>
</template>
```

<br/>

#### components.d.ts

로컬 컴포넌트, 내장 컴포넌트, 기본 HTML 요소 구성 없이 Type-Checking 을 사용할 수 있음

전역 컴포넌트의 경우 GlobalComponents 인터페이스를 정의해야 함

```typescript
// compoents.d.ts
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
  }
}

export {}
```

<br/>

### 동적 라우트 매칭

주어진 패턴을 가진 라우트를 동일한 컴포넌트에 매핑해야하는 경우가 자주 있음

예를들어 User List 는 `/user` 와 같은 경로에 매핑되면 되지만 User Detail 은 사용자 별로 같은 컴포넌트에 매핑 되어야 함

ex) `/users/alice` , `/users/emma` ... -> `UserComponent.vue`

이럴 때 Vue Router 에서는 경로에서 동적 세그먼트를 사용하여 해결할 수 있음

```javascript
const User = {
  template: `<div>User</div>`
}

const routes = [{ path: `/users/:id`, component: User }]
```

이제 `/users/alice`, `/users/emma` URL 은 모두 같은 경로 (`/users/:id`) 에 매핑 됨

- 동적 세그먼트는 : 으로 표시 됨
- 그리고 컴포넌트에서 동적 세그먼트의 값은 `$route.params` 필드로 접근할 수 있음

```javascript
const User = {
  template: `<div>User {{$route.params.id}}</div>`
}
```

동일한 라우트에 여러 동적 세그먼트를 가질 수 있으며, `$route.params` 필드에 매핑

| path                           | URL example            | $route.params                      |
| ------------------------------ | ---------------------- | ---------------------------------- |
| /users/:username               | /users/alice           | {username: 'alice'}                |
| /users/:username/posts/:postId | /users/alice/posts/123 | {username: 'alice', postId: '123'} |

<br/>

### query, hash

`$route.params` 외에도 `$route` 객체는 `$route.query(쿼리 스트링)`, `$route.hash(해시 태그)` 등과 같은 다른 유용한 정보도 노출

| URL example            | $route                                                 |
| ---------------------- | ------------------------------------------------------ |
| /users?searchText=love | {params:{...}, hash: '...', query: {searchText: love}} |
| /users/alice#profile   | {params:{...}, hash: 'profile', query: {...}}          |

<br/>

#### 404 Not Found Route

일반 파라미터(:id) 는 슬래쉬(/) 로 구분된 URL 사이의 문자만 일치시킴

무엇이든 일치시키려면 param 바로 뒤에 괄호 안에 정규식(regexp) 를 사용할 수 있음

```javascript
const routes = [
  // will match everything and put it under `$route.params.pathMatch`
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // will match anything starting with `/user-` and put it under `$route.params.afterUser`
  { path: '/user-:afterUser(.*)', component: UserGeneric }
]
```

<br/>

### 프로그래밍 방식 네비게이션

`<RouterLink>` 를 사용하여 선언적 네비게이션 용 anchor 태그를 사용하는 것 외에도 라우터 인스턴스 메소드를 사용하여 프로그래밍 방식으로 이를 수행할 수 있음

<br/>

#### router.push

다른 URL 로 이동하려면 router.push 를 사용할 수 있음

이 메소드는 새로운 항목을 히스토리 스택에 넣기 때문에 사용자가 브라우저 뒤로 가기 버튼을 클릭하면 이전 URL 로 이동하게 됨

이 메소드는 `<RouterLink>` 를 클릭할 때 내부적으로 호출되는 메소드 `<RouterLink :to="...">` 를 클ㄹ기하면 `router.push(...)` 를 호출하는 것과 같음

| 선언적 방식            | 프로그래밍 방식  |
| ---------------------- | ---------------- |
| <RouterLink :to="..."> | router.psuh(...) |

<br/>

```vue
<template>
  <RouterLink :to="..."></RouterLink>
</template>
```

`router.push` 파라미터는 문자열 경로 또는 객체가 될 수 있음

```javascript
// 리터럴 문자열 경로
router.push('/users/eduardo')

// 경로가 있는 개체
router.push({ path: '/users/eduardo' })

// 이름을 가지는 라우트
router.push({ name: 'user', params: { username: 'eduardo' } })

// 쿼리와 함께 사용, 결과적으로 /register?plan=private가 됩니다.
router.push({ path: '/register', query: { plan: 'private' } })

// 해시와 함께 사용, 결과적으로 /about#team가 됩니다.
router.push({ path: '/about', hash: '#team' })

////////////////////////////////////////////////////////////////////////////

const username = 'eduardo'
// URL을 수동으로 작성할 수 있지만 인코딩을 직접 처리해야 합니다.
router.push(`/user/${username}`) // -> /user/eduardo
// 위와 동일
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 가능하면 `name`과 `params`를 사용하여 자동 URL 인코딩의 이점을 얻습니다.
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `params`는 `path`와 함께 사용할 수 없습니다.
router.push({ path: '/user', params: { username } }) // -> /user
```

<br/>

#### router.replace

`router.push` 와 같은 역할을 하지만 유일한 차이는 새로운 히스토리 항목에 추가하지 않고 탐색함

이름에서 알 수 있듯이 현재 항목을 대체함

| 선언적 방식                     | 프로그래밍 방식     |
| ------------------------------- | ------------------- |
| <router-link :to="..." replace> | router.replace(...) |

`router.push` 메소드에 `replace:true` 속성을 추가하여 동일하게 동작시킬 수 있음

```javascript
router.push({ path: '/home', replace: true })
// equivalent to
router.replace({ path: '/home' })
```

<br/>

#### router.go(n)

이 메소드는 `window.history.go(n)` 와 비슷하게 히스토리 스택에서 앞으로 또는 뒤로 이동하는 단계를 나타내는 하나의 정수를 매개변수로 사용

```
// 한 단계 앞으로 갑니다. history.forward()와 같습니다.
router.go(1)

// 한 단계 뒤로 갑니다. history.back()와 같습니다.
router.go(-1)

// 3 단계 앞으로 갑니다.
router.go(3)

// 지정한 만큼의 기록이 없으면 자동으로 실패 합니다.
router.go(-100)
router.go(100)
```

<br/>

### Params 변경 사항에 반응하기

매개 변수와 함께 라우트를 사용할 때 주의할 점은 사용자가 `/users/alice` 에서 `/users/emma` 로 이동 할 때 동일한 컴포넌트 인스턴스가 재사용 된다는 것임. 왜냐하면 두 라우트 모두 동일한 컴포넌트를 랜더링 하므로 이전 인스턴스를 삭제한 다음 새 인스턴스를 만드는 것보다 효율적

이는 **컴포넌트의 라이프 사이클 훅이 호출되지 않음을 의미함**

<br/>

이렇게 동일한 컴포넌트를 재사용할 때 URL 이 변경되게 되면 라이프사이클 훅이 호출되지 않기 떄문에 훅에서 하던 일을 할 수 없음

이럴 때는 `Watcher(watch, watchEffect)` 또는 `beforeRouteUpdate` navigation guard 를 사용하여 `params` 와 같은 URL 변경사항에 반응할 수 있음

<br/>

#### watch 를 통한 params 반응하기

```vue
<script>
import { useRoute, watch } from 'vue-router'

const route = useRoute()

watch(
  () => route.params,
  (toParams, previousParams) => {
    // working
  }
)
</script>
```

#### beforeRouteUpdate

동일한 컴포넌트를 재사용할 때 URL 이 변경되는 경우 호출 됨

- Options API

```vue
<script>
export default {
  beforeRouteUpdate(to, from) {
    // working
    this.userData = await fetchUser(to.params.id)
  }
}
</script>
```

- Composition API

```vue
<script setup>
import { onBeforeRouteUpdate } from 'vue-router'

onBeforeRouteUpdate((to, from) => {
  console.log('onBeforeRouteUpdate')
})
</script>
```

<br/>

### 이름을 가지는 라우트 (Named Routes)

Route 인스턴스를 생성할 때 `path` 와 함께 `name` 을 지정할 수 있음

```javascript
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

이름을 가진 라우트에 링크를 하려면, 객체를 `router-link` 컴포넌트의 `to` props 로 전달할 수 있음

```vue
<template>
  <router-link :to="{{name: 'user', params: {username: 'erina'}}}"> user </router-link>
</template>
```

이것은 `router.push()` 와 프로그램적으로 사용되는 것과 정확히 같은 객체임

```javascript
router.push({ name: 'user', params: { username: 'erina' } })
```

두 경우 모두 라우터는 `/user/erina` 경로로 이동함

<br/>

### 이름을 가지는 뷰 (Named Views)

때로는 여러 개의 뷰(router-view) 를 중첩하지 않고 동시에 표시해야 하는 경우가 있음

이때 `router-view` 에 이름을 지정하여 여러개의 `router-view` 를 사용할 수 있음

또한 이름이 없는 `router-view` 는 `default` 가 이름으로 주어짐

```vue
<template>
  <router-view class="view left-sidebar" name="LeftSidebar"></router-view>
  <router-view class="view main-content"></router-view>
  <router-view class="view right-sidebar" name="RightSidebar"></router-view>
</template>
```

뷰는 컴포넌트를 사용하여 렌더링 되므로 여러 뷰에는 동일한 라우트에 대해 여러 컴포넌트가 필요함

`components` 옵션을 사용해야 함

```javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar
      }
    }
  ]
})
```

<br/>

### 중첩된 라우트 (Nested Route)

실제 앱 UI 는 일반적으로 여러단계로 중첩 된 컴포넌트로 이루어져 있음

URL 의 세그먼트가 중첩 된 컴포넌트의 특정 구조와 일치한다는 것은 매우 일반적임

```javascript
/user/johnny/profile                  /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

`vue-router` 를 사용하면 중첩 된 라우트 구성을 사용하여야 관계를 표현하는 것이 매우 간단

```vue
<!--App.vue-->
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
```

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
  </div>
</template>
```

```javascript
// router/index.js
const routes = [
  {
    path: '/user/:id',
    component: User
  }
]
```

`App.vue` 에 있는 `<router-view>` 는 최상위 `router-view` 임

이 `router-view` 는 `routes` 의 최상위 `path` 와 일치하는 컴포넌트 `User.vue` 가 랜더링 됨

그리고 `User.vue` 컴포넌트 내부에 중첩된 `<router-view>` 를 선언 할 수 있음

```javascript
// router/index.js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        component: UserPosts
      }
    ]
  }
]
```

```vue
<template>
  <!-- UserProfile.vue -->
  <div class="user-profile">User Profile</div>
</template>
```

```vue
<template>
  <!-- UserPosts.vue -->
  <div class="user-posts">User Posts</div>
</template>
```

#### 참고

- `/` **로 시작하는 중첩 경로는 루트 경로로 처리 됨. 이를 통해 중첩 URL 을 사용하지 않고도 컴포넌트 중첩을 활용 할 수 있음**
- 위 routes 설정으로 보면 `/users/alice` 로 방문했을 때 `User Component` 에 있는 중첩된 `<router-view/>` 에는 아무것도 랜더링 되지 않음
- 이러한 경우 빈 중첩 경로를 제공 할 수 있음

```javascript
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        path: '',
        component: UserHome
      }

      // ...other sub routes
    ]
  }
]
```

### 라우트 컴포넌트에 속성 전달

컴포넌트에서 `$route` 객체를 사용하면 특정 URL 에서만 사용할 수 있게되어 라우트와 강한 결합을 만듦

따라서 컴포넌트의 유연성이 제한 됨. 이런 결합이 꼭 나쁜 것만은 아니지만 `props` 옵션으로 이 동작을 분리할 수 있음

컴포넌트와 라우터 속성을 분리하려면 ...

- 라우트에 의존된 컴포넌트

```javascript
const User = {
  template: '<div>User {{$route.params.id}}</div>'
}

const routes = [{ path: '/user/:id', component: User }]
```

- 라우트 의존도 해제

```javascript
const User = {
  // make sure to add a prop named exactly like the route param
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const routes = [{ path: '/user/:id', component: User, props: true }]
}
```

이를 통해 어디서나 컴포넌트를 사용할 수 있으므로 컴포넌트 재사용 및 테스트하기가 더 쉬움

<br/>

#### Boolean 모드

`props` 를 `true` 로 설정하면 `route.params` 가 컴포넌트 `props` 로 설정 됨

<br/>

#### Named Views

이름을 가지는 뷰(Named Views) 가 있는 경우 각 Named Views 에 대한 `props` 옵션을 정의해야 함

```javascript
const routes = [
  {
    path: '/user/:id',
    components: { default: User, sidebar: Sidebar },
    props: { default: true, sidebar: false }
  }
]
```

<br/>

#### 객체 모드

`props` 가 객체일 때 컴포넌트 `props` 가 있는 그대로 설정됨 `props` 가 정적일 때 유용

```javascript
const routes = [
  {
    path: '/promotion/from-newsletter',
    component: Promotion,
    props: { newsletterPopup: false }
  }
]
```

<br/>

#### 함수 모드

`props` 를 반환하는 함수를 만들 수 있음 이를 통해 전달인자를 다른 타입으로 캐스팅하고 적정인 값을 라우트 기반 값과 결합

```javascript
const routes = [
  {
    path: '/search',
    component: SearchUser,
    props: (route) => ({ query: route.query.q })
  }
]
```

<br/>

### 다양한 history 모드

Router 인스턴스를 생성할 때 `history` 옵션을 사용하면 다양한 history mode 중에서 선택할 수 있음

- Hash - _createWebHashHistory()_
- History - _createWebHistory()_
- Memory - _createMemoryHistory()_

<br/>

#### Hash 모드

Vue Router 를 통해 URL 으로 페이지를 전환할 때 히스토리 관리 기법을 해시(#) 형으로 쓸 수 있게 해줌

해시모드는 `createWebHashHistory()` 를 사용하여 생성 됨

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    //...
  ]
})
```

내부적으로 전달되는 실제 URL 앞에 해시 문자(#) 을 사용함. URL 의 이 섹션은 서버로 전송되지 않아 서버 수준에서 특별한 처리가 필요하지 않음

그렇기 때문에 **SEO 에 나쁜 영향을 미침**

페이지가 라우팅 될 때 Hashing 이 되어 요청 URL 이 BASEURL 로만 전송이 되기 때문

SEO 의 동작 방식에 따르면 각 페이지 위치에 따라 적용이 되어야 하는데 요청 URL 이 바뀌지 않으므로 SEO 에는 정말 좋지 않음

따라서 **SEO 를 고려 할 것이라면 HTML5 모드 (createWebHistory()) 를 사용해야 함**

<br/>

#### History 모드 (HTML5 모드)

Vue Router 를 통해 URL 으로 페이지를 전환할 때 히스토리 관리 기법을 해시(#) 없이 쓸 수 있게 해줌

Web API 인 `history.pushState()` 를 활용하여 페이지를 다시 로드하지 않고도 URL 탐색을 할 수 있음

HTML5 모드는 `createWebHistory()` 로 생성되며 권장 모드임

```javascript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //...
  ]
})
```

`createWebHistory()` 를 사용하면 URL 은 정상으로 모임

하지만 우리 앱이 적절한 서버 설정이 없는 단일 페이지 클라이언트 앱이기 때문에 사용자가 직접

`http://oursite.com/user/id` 에 접근하면 404 오류가 나타남

문제를 해결 하려면 포괄적인 대체경로를 추가하기만 하면 됨 URL 이 정적 에셋과 일치하지 않으면 앱이 있는 동일한

`index.html` 을 제공해주면 됨

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
