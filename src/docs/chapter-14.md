## Non-Prop 속성 (Fallthrough)

> props 속성 또는 event 에 명시적으로 선언되지 않은 속성 또는 이벤트
>
> `class`, `style`, `id`

<br/>

### 속성 상속

컴포넌트가 단일 루트 요소로 구성되어 있으면 Non-Prop 속성은 루트 요소의 속성에 자동으로 추가 됨

```html
<!-- template of <MyButton/> -->
<button>click me</button>
```

그리고 이 컴포넌트를 사용하는 부모 컴포넌트는 다음과 같음

```html
<MyButton class="large" />
```

따라서 최종 랜더링 된 DOM 은

```html
<button class="large">click me</button>
```

<br/>

### class style 속성 병합

만약 자식 컴포넌트 루트요소에 이미 `class` 와 `style` 속성이 정의되어 있으면, 부모로 받은 `class`, `style` 속성과 병합 됨

```html
<!-- template of <MyButton/> -->
<button class="btn">click me</button>
```

최종 병합 된 DOM

```html
<button class="btn large">click me</button>
```

<br/>

### v-on 이벤트 리스너 상속

v-on 이벤트 리스너도 동일하게 상속 됨

```vue
<template>
  <MyButton @click="onClick" />
</template>
```

- `@click` 리스너는 `<MyButton/>` 의 컴포넌트 루트요소인 `<button>` 요소에 추가 됨
- 만약 `<button/>` 요소에 이미 바인딩 된 이벤트가 있다면 이벤트가 추가되어 두 리스너 모두 트리거 됨

<br/>

### 속성 상속 비활성화

컴포넌트가 자동으로 `non-prop` 속성을 상속하지 않도록 하려면 컴포넌트의 `inheritAttrs: false` 옵션을 설정할 수 있음

```vue
<template>
  <button class="btn" data-link="hello">click me</button>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

컴포넌트에 `non-prop` 속성을 비활성화 하는 일반적인 경우는 자식 컴포넌트의 루트요소에 이외의 다른 요소에 `non-prop` 속성을 적용하고 싶을 때임

그리고 적용해야 하는 요소에 `<template>` 에서 non-prop 속성에 접근할 수 있는 내장 객체 `$attrs` 직접 접근할 수 있음

```vue
<template>
  <template>
    <p>Non-Prop 속성: {{ $attrs }}</p>
  </template>
</template>
```

`$attrs` 객체에는 컴포넌트에 선언되지 않은 모든 속성 `props`, `emits` (`class`, `style`, `v-on`) 을 포함하고 있음

- props 와 달리 non-props 속성은 JavaScript 에서 대소문자를 유지하므로 `foo-bar` 와 같은 속성은 `$attrs['foo-bar']` 로 접근해야 함
- `@click` 과 같은 `v-on` 리스너는 `$attrs.onClick` 과 같이 함수로 접근할 수 있음

<br/>

#### non-props 속성을 특정요소에 모두 적용하기

`inheritAttrs: false` 와 `$attrs` 를 이용하면 non-props 속성을 특정 요소에 모두 적용할 수 있음

```vue
<template>
  <label>
    이름:
    <input type="text" v-bind="$attrs" />
  </label>
</template>
<script>
export default {
  inheritAttrs: false
}
</script>
```

부모 컴포넌트

```vue
<template>
  <MyInput class="my-input" placeholder="didj" @keyup="onKeyup" data-message="Hello World!" />
</template>
```

> TIP
>
> Vue3 에서 `$listenr` 객체가 제거됨, 모든 리스너는 이제 `$attrs` 의 일부가 됨
