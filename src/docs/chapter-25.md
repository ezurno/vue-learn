## Custom Directives

> Vue 코어에서 기본으로 제공하는 디렉티브 (`v-if`, `v-for` ...) 외에도 Vue 를 사용하면 직접 커스텀한 Directive 를 만들 수 있음

Vue 에서는 _Component_ 와 _Composables_ 두 가지 형태의 코드 재사용을 도입 함

커모넌트는 주요 **빌딩 블록을 재사용** 하는 반면 컴포저블은 **stateful logic을 재사용**하는 데 중점을 둠

반면에 커스텀 디렉티브는 주로 일반 요소에 대한 low-level DOM 접근과 관련된 로직을 재사용하기 위한 것

<br/>

### Script setup Directives

`<script setup>` 에서 `v` 접두사로 시작하는 모든 camelCase 변수를 커스텀 디렉티브로 사용할 수 있음

아래 예에서 `vFocus` sms `<template>` 에서 `v-focus` 로 사용될 수 있음

```vue
<script setup>
//  enables v-focus in templates
const vFocus = {
  mounted: (element) => element.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

`v-focus` 디랙티브는 페이지 로드 시에만 작동하는 것이 아니라 Vue 에서 동적으로 요소를 삽입 할 때도 작동하기 때문에 `autoFocus` 속성이 더 유용함

<br/>

### Script directives

일반 `<script>` 를 사용하는 경우 `directives` 옵션을 사용하여 커스텀 디렉티브를 등록할 수 있음

```vue
<script>
export default {
  setup() {
    /* ... */
  },
  directives: {
    // enables v-focus in template
    focus: {
      /* ... */
    }
  }
}
</script>
```

<br/>

### Global Directives

앱 수준에서 커스텀 디렉티브를 전역적으로 등록하는 것도 일반적임

```javascript
const app = createApp()

// make v-focus usable in all components
app.directive('focus', {
  /* ... */
})
```

<br/>

### Directives Hooks

디렉티브 정의 객체는 다음과 같은 여러 훅을 사용할 수 있음

```vue
<script>
const myDirective = {
	// 바인딩된 요소의 속성 전에 호출됨
	// 또는 이벤트 리스너가 적용됨
	created(el, binding, vnode, prevVnode) {
	// 인수에 대한 자세한 내용은 아래를 참조하십시오.
	},
	// 요소가 DOM에 삽입되기 직전에 호출됩니다.
	beforeMount() {},
	// 바인딩된 요소의 부모 구성 요소가 있을 때 호출됩니다.
	// 모든 자식이 마운트됩니다.
	mounted() {},
	// 상위 컴포넌트가 업데이트되기 전에 호출됨
	beforeUpdate() {},
	// 상위 컴포넌트 다음에 호출되고
	// 모든 자식이 업데이트되었습니다.
	updated() {},
	// 상위 컴포넌트가 마운트 해제되기 전에 호출됨
	beforeUnmount() {},
	// 상위 컴포넌트가 마운트 해제될 때 호출됩니다.
	unmounted() {}
	}
}
</script>
```

<br/>

### Directives Hooks 의 매개변수

디렉티브 훅에는 다음과 같은 매개변수가 주로 전달 됨

- `element` : 디렉티브가 바인딩 된 요소. DOM 을 직접 조작하는 데에 사용할 수 있음
- `binding` : 다음 속성을 포함하는 개체
  - `value` : 지시문에 전달 된 값. ex) `v-my-directive="1 + 1"` 에서의 값은 `2`
  - `oldValue` : `beforeUpdate` 및 업데이트에서만 사용할 수 있는 이전 값. 값이 변경되었는지 여부에 관계없이 사용 가능
  - `arg` : 지시문에 전달된 인수. ex) `v-my-directive:foo` 에서의 인수는 `foo`
  - `modifiers` : 수정자가 있는 경우 수정자를 포함하는개체 ex) `v-my-directive.foo.bar` 에서 수정자 객체는 `{foo: true, bar: true}`
  - `instance` : 지시문이 사용되는 구성 요소의 인스턴스
  - `dir` : 지시문 정의 개체
- `vnode` : 바인딩된 요소를 나타내는 기본 VNode
- `prevnode` : 이전 렌더링에서 바인딩 된 요소를 나타내느 VNode. `beforeUpdate` 및 `updated` hook 에서만 사용할 수 이씅ㅁ

```vue
<template>
  <div v-example:foo.bar></div>
</template>
```

`binding` 매개변수는 다음과 같은 형태의 객체

```javascript
{
    arg: 'foo',
    modifiers: {bar: true},
    value: /* value of `baz` */,
    oldValue: /* value of `baz` from previous update */
}
```

<br/>

### 함수로 단축 표현

다른 Hook 이 필요없이 커스텀 디렉티브가 `mounted` 와 `updated` 에 대해 동일한 동작을 갖는 것이 일반적임

이러한 경우 디렉티브를 함수로 정의 할 수 있음

```vue
<template>
  <div v-color="color"></div>
</template>
<script>
app.directive('color', (element, binding) => {
  // mounted , updated 모두에 대해 호출
  el.style.color = binding.value
})
</script>
```

<br/>

### 객체 리터럴

디렉티브에 여러 값이 필요한 경우 JavaScript 객체를 전달할 수도 있음

디렉티브는 모든 JavaScript 표현식을 사용할 수 있음을 명심해야 함

```vue
<template>
  <div v-demo="{ color: `white`, text: `hello` }"></div>
</template>
<script>
app.directive('demo', (element, binding) => {
  console.log(binding.value.color)
  console.log(binding.value.text)
})
</script>
```

<br/>

### 컴포넌트에서 커스텀 디렉티브 사용

커스텀 디렉티브가 컴포넌트에서 사용되면 Non-Props 속성과 유사하게 항상 컴포넌트의 루트 노드에 적용 됨

```vue
<template>
  <MyComponent v-demo="test" />
</template>
```

```vue
<!-- template of MyComponent -->
<template>
  <!-- v-demo 디렉티브가 여기에 적용 됨 -->

  <div>
    <span>My Component Content</span>
  </div>
</template>
```

컴포넌트에는 잠재적으로 둘 이상의 루트 노드가 있을 수 있음. 다중 루트 컴포넌트에 커스텀 디렉티브를 적용하면 디렉티브가 무시되고 경고가 발생하기 때문

**속성과 달리 디렉티브는 `v-bind='$attrs'` 를 사용하여 다른 요소에 전달할 수 없음**

_일반적으로 컴포넌트에 사용자 지정 지시문을 사용하는 것은 권장되지 않음_

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
