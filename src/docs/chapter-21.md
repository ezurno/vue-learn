## Navigation Guard

> Vue Router 에서 제공하며 주로 페이지 이동을 리다이렉션 하거나 취소 하여 특정 페이지 진입을 보호하는데 사용

라우트 탐색 프로세스에 연결하는 방법에는 전역, 라우트별 또는 컴포넌트가 있음

<br/>

### Global Guard

#### Global Before Guards

`router.beforeEach` 를 사용하여 전역가드를 등록할 수 있음

```javascript
const router = createRouter({...})

router.beforeEach((to, from) => {
    // ...
    // 네비게이션을 취소하려면 명시적으로 false 를 반환함
    return false
})
```

네비게이션이 트리거될 때마다 가드가 작성 순서에 따라 호출되기 전의 모든 경우에 발생

가드는 비동기식으로 실행 될 수 있으며 네비게이션은 모든 훅이 해결되기 전까지 **보류 중**으로 간주 됨

- `to` : 라우팅 되는 _RouteLocationNormalized_ 객체 (라우트 위치 정보를 담고 있는 객체)
- `from` : 라우팅 되기 전의 _RouteLocationNormalized_ 객체 (라우트 위치 정보를 담고 있는 객체)

또한 선택적으로 다음 값 중 하나를 반환 할 수 있음

- `false` : 현재 라우팅(네비게이션) 을 취소
- A _Route Location_ : 경로 위치를 반환하여 다른 위치로 리다이렉션 할 수 있음 전달 된 값은 `router.push()` 를 호출할 때와 같은 값을 내보내면 됨

만약 `undefined` 또는 `true` 가 반환되면 해당 네비게이션 가드가 검증이 된 것으로 판단 되어 다음 네비게이션 수행

**Optional Third Argument** `next`

Vue Router 의 이전 버전에서는 세 번째 인수 `next` 를 사용할 수도 있었는데 이는 일반적인 실수의 원인이었으며 _RFC_ 를 통해 제거

<br/>

```javascript
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  }
  next()
})
```

```javascript
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
```

<br/>

#### Global Resolve Guards

`router.beforeResolve` 로 글로벌 가드를 등록할 수 있음

이는 `router.beforeEach` 와 유사함 모든 컴포넌트 가드와 비동기 라우트 컴포넌트를 불러온 후 네비게이션 가드를 확인하기 전

호출된다는 차이가 있음

```javascript
router.beforeResolve(async (to) => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // 오류를 처리한 다음 다음 탐색을 취소
        return false
      } else {
        // 예기치 않은 오류, 탐색을 취소한 후 오류를 전역 처리기에 전달
        throw error
      }
    }
  }
})
```

<br/>

#### Global After Hooks

전역 훅을 등록 할 수도 있지만 가드와 달리 이 훅은 `next` 함수를 얻지 못하며 네비게이션에 영향을 줄 수 없음

```javascript
router.afterEach((to, from) => {
  // ...
})
```

<br/>

### Route Guard

`beforeEnter` 가드를 라우트의 설정 객체에 직접 정의 할 수 있음

```javascript
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    }
  }
]
```

`beforeEnter` 가드는 해당 라우트에 진입할 때만 트리거 됨, 그리고 같은 URL ㅣ면서 `params`, `query`, `hash` 의 변경이 일어났을 때는 트리거 되지 않음

가드는 오직 다른 라우트로 네비게이션 할 때만 트리거 됨

`beforeEnter` 가드에 함수의 배열을 전달할 수 있음. 이 것은 다른 라우트에 설정한 가드를 재사용할 때 유용함

```javascript
function removeQueryParams(to) {
  if (Object.keys(to.query).length) {
    return { path: to.path, query: {}, hash: to.hash }
  }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: {}, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash]
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams]
  }
]
```

_route meta filed_ 와 _global navigation guards_ 를 사용하여 유사한 동작을 달성할 수 있음

<br/>

### 컴포넌트 내 가드

마지막으로 라우트 컴포넌트(라우터 구성에 전달되는 컴포넌트) 내부에 라우트 네비게이션 가드를 직접 정의 할 수 있음

<br/>

#### Options API 사용

컴포넌트를 라우팅하기 위해 다음 옵션을 추가할 수 있음

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```javascript
const UserDetails = {
  template: '...',
  beforeRouteEnter(to, from) {
    // 네비게이션 이동이 확정된 이후 컴포넌트가 만들어지기 전에 실행이 되는 가드
    // `this` 구성 요소 인스턴스에 대한 액세스 권한이 없음
    // 이 가드가 호출될 때 아직 생성이 되지 않았기 때문
  },
  beforeRouteUpdate(to, from) {
    // 이 컴포넌트를 랜더링하는 경로가 변경되면 호출
    // 하지만 이 구성요소는 새 경로에서 재사용 됨
    // 예를 들어 `/users/:id` 매개변수가 있는 경로가 주어지면
    // `/users/1` 과 `/users/2` 사이를 탐색함. 동일한 `UserDetails` 구성요소임
    // 재사용되며 이 경우 Hook 가 호출 됨
    // 이 과정에서 구성요소가 마운트되기 때문에 탐색 가드는 `this` 구성 요소 인스턴스에 엑세스할 수 있음
  },
  beforeRouteLeave(to, from) {
    // 라우트를 떠날 때 실행이 되는 코드
    // 멀리 탐색
    // `beforeRouteUpdate` 와 마찬가지로 `this` 구성 요소 인스턴스에 엑세스할 수 있음
  }
}
```

`beforeRouteEnter` rkemsms `this` 에 대한 엑세스 권한이 없음

네비게이션이 확인되기 전에 가드가 호출되어 새 입력 구성가 아직 생성되지 않았기 때문

그러나 콜백을 `next` 에 전달하여 인스턴스에 엑세스 할 수 있음

네비게이션이 확인되면 콜백이 호출되고 컴포넌트 인스턴스가 매개변수로 콜백에 전달 됨

```javascript
beforeRouteEnter(to, from, next) {
    next(vm => {
        // access to component public instance via 'vm'
    })
}
```

`beforeRouteLeave` 가드는 일반적으로 사용자가 저장하지 않은 편집으로 실수로 떠나는 것을 방지하는데 사용

`false` 를 반환하여 탐색을 취소할 수 있음

```javascript
beforeRouteLeave(to, from) {
    const answer = window.confirm('정말 떠나시겠습니까? 저장되지 않은 변경사항이 있습니다.')
    if(!answer) return false
}
```

#### Composition API 사용

Composition API 에서는 `onBeforeRouteUpdate` 와 `onBeforeRouteLeave` 를 사용할 수 있음

- `beforeRouteUpdate` -> `onBeforeRouteUpdate`
- `beforeRouteLeave` -> `onBeforeRouteLeave`

```javascript
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    // same as beforeRouteLeave option with no access to `this`
    onBeforeRouteLeave((to, from) => {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      // cancel the navigation and stay on the same page
      if (!answer) return false
    })

    const userData = ref()

    // same as beforeRouteUpdate option with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
      // only fetch the user if the id changed as maybe only the query or the hash changed
      if (to.params.id !== from.params.id) {
        userData.value = await fetchUser(to.params.id)
      }
    })
  }
}
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
