### 상태(State) 저장하기

```vue
<script setup>
import { ref } from 'vue'
const posts = ref([])
// ref 으로 초깃 값을 선언해서 사용

posts.value = ['안녕하세요']
// posts.value 로 직접 접근하여 초기화
</script>
```

1. `vue` 내 내장함수 `ref()` 를 활용해 초깃값을 선언
2. 값을 수정하고 싶을 땐 `value` 를 직접 초기화

<br/>

### event 등록하기

```vue
<template>
  <div>
    <button @click="submit">제출하기</button>
    <button @click="onMove(`/home`)">이동하기</button>
  </div>
</template>
<script>
const submit = () => {
  //...
}
const onMove = (dest) => {
  router.push(dest)
}
</script>
```

1. `onClick`, `onMouseEnter` 등 사용할 때 `@` 으로 사용
2. 함수 사용 시 `""` 에 감싸서 사용
3. 함수의 매개변수 사용 시 `{}` 할 필요 없이 바로 `""` 내 에서 사용

<br/>

### ref vs reactive

> vue 에서 객체와 배열을 동적으로 사용할 때 두가지 방법이 있다.
>
> ref 와 reactive. 두가지의 장단점을 알아보자

#### Ref

장점

1. 한꺼번에 객체 할당이 가능함
2. 레퍼런스 타입과 프로미티브 타입을 둘 다 할당이 가능

단점

1. 값에 계속해서 value 를 써 주어야 함
2. 반응형으로 설계 하기 쉬움

```vue
<script>
const form = ref({})
form.value = { ...data }

form.value.title = '123'
</script>
```

#### Reactive

장점

1. form 에 직접적으로 데이터 값에 접근할 수 있음

단점

1. 데이터 값 하나씩 다 입력을 해주어야 반응형이 살아남
2. 객체 할당이 불가능 함
3. 레퍼런스 타입만 할당이 가능

```vue
<script>
const form = reactive({})
form.title = data.title
form.info = data.info

form.title = '123'
</script>
```

### page 에 props 로 전달하기

1. page 에 props 로 state 를 전달하기 위해선 router 에 props 를 true 로 설정 해야한다.

```javascript
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true
  },
```

```vue
<script>
const props = defineprops({
  id: String
})
</script>
```
