## Plugins

낮은 수준의 API 덕분에 Pinia Store 를 완전히 확장 할 수 있음

- Store 에 새 속성 추가
- Store 를 정의 할 때 새로운 옵션 추가
- Store 에 새로운 방법 추가
- 기존 매서드 래핑
- actions 변경 또는 취소
- 로컬스토리지와 같은 부작용 구현
- 특정 Store 에만 적용

플러그인은 `pinia.use()` 를 사용하여 pinia 인스턴스에 추가 됨

가장 간단한 예는 객체를 반환하여 모든 저장소에 정적 속성을 추가 하는 것

```javascript
import { createPinia } from 'pinia'

// 이 플러그인이 설치된 후 생성되는 모든 저장소에 `secret`이라는 속성을 추가합니다.
// 이것은 다른 파일에 있을 수 있습니다.
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 플러그인을 pinia에 제공
pinia.use(SecretPiniaPlugin)

// 다른 파일에서
const store = useStore()
store.secret // 'the cake is a lie' 출력
```

Router, modal, Toast manager 와 같은 건역 객체를 추가하는 데 유용함

<br/>

### 소개

Pinia Plugin 은 Store 추가할 속성을 선택적으로 반환하는 기능 또한 context 매개변수를 받음

```javascript
export function myPiniaPlugin(context) {
  context.pinia // `createPinia()`로 생성된 pinia
  context.app // `createApp()`으로 생성된 현재 앱(Vue 3만 해당)
  context.store // 플러그인이 확장 중인 저장소
  context.options // `defineStore()`에 전달된 저장소를 정의하는 옵션 객체
}
```

이 함수를 `pinia.use()` 를 사용하여 파라미터로 전달함

```javascript
pinia.use(myPiniaPlugin)
```

플러그인은 `pinia` 가 `app` 에 전달 된 후에 생성된 Store 에만 적용

<br/>

### Store 확장

플러그인에서 객체를 반환하기만 하면 모든 Store 에 속성을 추가할 수 있음

```javascript
pinia.use(() => ({ hello: 'world' }))
```

<br/>

`store` 에서 직접 속성을 설정할 수도 있지만, 가능한 경우 객체를 리턴하여 devtools 에서 작동으로 추적할 수 있도록 해야함

```javascript
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

플러그인에 의해 반환된 모든 속성은 devtools 에 의해 자동으로 추적되므로 devtools에서 `hello` 를 표시하려면

devtools 에서 디버그하려는 경우에만 dev 모드의 `store._customProperties` 에 추가해야 함

```javascript
// 위의 예에서
pinia.use(({ store }) => {
  store.hello = 'world'
  // 번들러가 이것을 처리하는지 확인하십시오. webpack 및 vite는 기본적으로 수행해야 합니다.
  if (process.env.NODE_ENV === 'development') {
    // 스토어에서 설정한 키를 추가합니다.
    store._customProperties.add('hello')
  }
})
```

<br/>

### 새로운 state 추가

Store 에 새로운 `state` 속성을 추가하거나 hydration 중에 사용할 속성을 추가하려면 두 위치에 추가해야 함

- Store 에서 `store.myState` 로 액세스 할 수 있음
- `store.$state` 에서 devtools 에서 사용할 수 있고 SSR 동안 직렬화 할 수 있음

이렇게 하면 ref 또는 계산된 속성을 공유할 수 있음

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
