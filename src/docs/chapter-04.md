## 조건부 랜더링

- `v-if` : 조건부로 블록을 랜더링

```vue
<template>
  <h1 v-if="visible">HELLO VUE3</h1>
</template>
```

- `v-else` : `v-if` 가 **FALSE** 일 때 랜더링 하는 랜더링 블록

```vue
<template>
  <h1 v-if="visible">HELLO VUE3</h1>
  <h1 v-else>GOOD BYE</h1>
</template>
```

- `v-else-if` : 여러 조건 블록

```vue
<template>
  <h1 v-if="type === 'A'">A</h1>
  <h1 v-else-if="type === 'B'">B</h1>
  <h1 v-else-if="type === 'C'">C</h1>
  <h1 v-else>Not A/B/C</h1>
</template>
```

- `v-show` : 요소를 조건부로 표시

```vue
<template>
  <h1 v-show="show">TITLE</h1>
  <button @click="show = !show">TOGGLE SHOW</button>
</template>
```

### v-if vs v-show

`v-if`는 "실제" 로 rendering 되는 반면 전환할 때 블록 내부의 컴포넌트들이 제거되고 다시 생성되기 떄문

또한 `v-if` 는 **게으름**. 초기 랜더링 시 , 조건이 false 면 아무 작업도 하지 않음

이에 비해 `v-show` 는 훨씬 간단함

엘리먼트는 CSS 기반 전환으로 초기 조건과 관게없이 항상 랜더링

일반적으로 `v-if` 는 전환 비용이 높은 반면, `v-show` 는 초기 랜더링 비용이 높음

그러므로 무언가를 자주 전환해야 한다면 `v-show` 런타임시 조건이 변경이 잘 없다면 `v-if`

<br/>

### v-if 와 v-for

> TIP
>
> `v-if` 와 `v-for` 를 함께 쓰는건 권장하지 않음

동일한 엘리먼트에서 `v-if` 와 `v-for` 를 함께 사용할 때, `v-if` 가 더 높은 우선순위를 가짐

의도한대로 동작하지 않을 가능성이 높음

<br/>

## 목록 랜더링

### v-for

`v-for` 를 사용하여 배열인 목록을 랜더링 할 수 있음

```vue
<script>
const items = reactive([
  { id: 1, message: 'JAVA' },
  { id: 2, message: 'HTML' },
  { id: 3, message: 'CSS' },
  { id: 4, message: 'JavaScript' }
])
</script>

<template>
  <li v-for="(item, index) in items" :key="item.id">
    {{ item.message }}
  </li>
</template>
```

- `v-for="item in items"` 문법을 사용해 배열에서 항목을 순차적으로 할당
- `v-for="(item, index) in items"` 문법을 사용해 배열 인덱스를 가져올 수 있음
- 항목을 나열 할 시 `:key` 속성에 고유한 키 값 지정 필수

```vue
<script>
const myObject = reactive({
  title: '제목입니다.',
  author: '홍길동',
  publishedAt: '2024'
})
</script>

<template>
  <li v-for="(value, key, index) in myObject" :key="key">{{ key }} - {{ value }} - {{ index }}</li>
</template>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
