## Transition

> Vue 에서는 Transition 이나 Animation 을 쉽게할 수 있도록 도움을 주는 두가지 내장된 컴포넌트를 제공

- `<Transition>` : 컴포넌트가 DOM 에 나타나고 사라질 때 애니메이션을 적용하기 위해 사용하는 컴포넌트
- `<TransitionGroup>` : 컴포넌트가 `v-for` 목록에 삽입, 제거 또는 이동할 때 애니메이션을 적용하기 위해 사용하는 컴포넌트

<br/>

### Transition Component

`<Transition>` 은 기본으로 제공되는 컴포넌트 이며 등록되지 않고 모든 컴포넌트 내 `<template>` 에서 사용할 수 있음

`default slot` 을 통해 전달 된 컴포넌트가 나타나거나(enter) 사라질 때(leave) 애니메이션을 적용하는 데 사용할 수 있음

입장(enter) 또는 퇴장(leave)는 다음 중 하나에 의해 트리거 될 수 있음

- `v-if` 를 통한 조건부 렌더링
- `v-show` 를 통한 조건부 표시
- `<component>` 라는 특수 엘리먼트를 통한 동적 컴포넌트(Dynamic Component) 토글

```vue
<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>
  </Transition>
</template>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

이름이 존재하지 않으면 `v`, 존재하면 이름을 사용해서 `style` 을 생성하면 됨

<br/>

## Transition Group

`<Transition Group>` 은 목록에서 랜더링되는 요소 또는 컴포넌트의 삽입, 제거 및 순서 변경을 애니메이션으로 만들기 위해 설계된 내장 컴포넌트

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
