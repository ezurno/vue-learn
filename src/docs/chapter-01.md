## 반응형 기초

### 반응형 상태 선언하기

JavaScript 객체에서 반응형 상태를 생성하기 위해서는 `reactive()` 함수 사용

```vue
<script>
import { reactive } from 'vue'

// 반응형 상태
const state = reactive({ count: 0 })
</script>
```

컴포넌트 `<template>` 에서 반응형 객체를 사용하려면 `setup()` 함수에서 선언하고 리턴해야 함

- 반환된 상태는 반응형 객체임, 반응형 변환은 Deep 함 (깊음)
- 컴포넌트의 `data()` 에서 객체를 반환할 때, 내부적으로 `reactive()` 에 의한 반응형으로 만들어짐

```vue
<script>
import { reactive } from 'vue'

export default {
  setup() {
    const state = reactive({ count: 0 })

    return {
      state
    }
  }
}
</script>

<template>
  <div>{{ state.count }}</div>
</template>
```

<br/>

### Ref 로 원시값 반응형 데이터 생성하기

`reactive()` 함수는 객체타입에만 동작. 따라서 기본타입 (number, string, boolean) 을 반응형으로 반들고자 할 때 `ref` 사용

```vue
<script>
import { ref } from 'vue'
const count = ref(0)
</script>
```

`ref` 메서드는 mutable 한 객체를 반환, 이 객체 안에는 `value` 라는 하나의 속성만 포함함

`value` 값은 `ref()` 메서드에서 매개변수로 받은 값을 갖고 있음

이 객체는 내부의 `value` 값에 대한 반응형 참조 (referense) 역할을 함

```vue
<script>
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
</script>
```

#### 템플릿에서 사용 시

템플릿에서 사용할 때는 자동으로 내부 값을 풀어내기 때문에 `.value` 로 사용할 필요가 없음

```vue
<template>
  <div>
    <span>{{ count }}</span>
    <button @click="count++">카운트 증가</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return {
      count
    }
  }
}
</script>
```

#### 반응형 객체에서 사용 시

`ref` 가 반응형 객체에서의 속성으로 접근할 때, 자동적으로 내부 값으로 벗겨내서

일반적인 속성과 마찬가지로 동작함

```vue
<script>
const count = ref(0)
const state = reactive({
  count
})
count.value++
console.log(count.value) // 1
console.log(state.count) // 1
</script>
```

#### 배열에서 사용 시

반응형과 달리 ref 가 반응형 배열 또는 Map 같은 기본 컬렉션 타입의 요소로 접근 될 때 수행 되는 래핑 해제가 없음

(.value 를 사용해야 한다)

```vue
<script>
const books = reactive([ref('Vue 3 Guide')])
// need .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// need .value
console.log(map.get('count').value)
</script>
```

### 반응형 상태 구조분해하기 (Destructuring)

큰 반응형 객체의 몇몇 속성을 사용하길 원할 때, 원하는 속성을 얻기 위해 ES6 구조분해할당을 사용하는건 일반적임

```vue
<script>
import { reactive } from 'vue'

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: '당신은 책을 읽는 중',
  price: '무료'
})

let { author, title } = book
</script>
```

대신 구조분해로 인해 반응형을 잃게 됨

이럴 때에는 반응형 객체의 일련의 ref 들로 변환 해야 됨

`ref` 는 소스객체에 대한 반응형 연결을 유지함

`toRefs`, `toRef` 을 사용하면 반응ㅎ형 객체의 속성과 동기화가 됨

```vue
<script>
import { reactive, toRefs } from 'vue'

const book = reactive({
  author: 'vue team',
  year: '2020',
  title: 'vue 3 guide'
})

let { author, title } = toRefs(book)
title.value = 'vue 3 상세 가이드'
console.log(book.title)
</script>
```

### readonly 를 이용한 반응형 객체 수정 방지

반응형 객체의 변화를 추적하지 않으려면 (동기화 하지 않으려면) `readonly` 를 활용하여 막음

```vue
<script>
import { reactive, readonly } from 'vue'
const original = reactive({ count: 0 })
const copy = readonly(original)

original.count++ // success
copy.count++ // error occured !!
</script>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
