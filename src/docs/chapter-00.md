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
