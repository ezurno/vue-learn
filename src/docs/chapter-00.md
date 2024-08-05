## 템플릿 문법 (Template Syntax)

> Vue 는 템플릿 문법을 사용하여 렌더링된 DOM 을 컴포넌트의 인스턴스 데이터에 선언적으로 바인딩할 수 있음

### 텍스트 보간법

데이터 바인딩의 가장 기본적인 형태는 `{{data}}` (이중 중괄호, 콧수염 괄호) 를 사용하는 것

- 이중 중괄호를 사용하면 해당 문법은 컴포넌트 인스턴스의 `message` 값으로 대체 됨
- `message` 속성이 변경될 때 마다 갱신(반응) 됨

```vue
<template>
  <div>
    <p>문자열 : {{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const message = ref('안녕하세요')
    return {
      message
    }
  }
}
</script>
```

`v-once` 디렉티브를 사용하여 데이터가 변경되어도 갱신되지 않는 일회성 보간도 가능

```vue
<template>
  <p v-once>문자열 : {{ message }}</p>
</template>
```

<br/>

### HTML (v-html)

이중 중괄호는 데이터를 HTML 이 아닌 일반 텍스트로 해석하므로 실제 HTML 을 출력하려면 `v-html` 디렉티브를 사용

```vue
<template>
  <h2>텍스트 : {{ rawHTML }}</h2>
  <h2>v-html: <span v-html="rawHTML"></span></h2>
</template>
```

> TIP
>
> 웹사이트에서 임의 HTML 을 동적으로 랜더링 하면 XSS 취약점으로 쉽게 이어질 수 있으므로
>
> 신뢰할 수 있는 콘텐츠에서만 사용하고, 사용자가 제공한 콘텐츠에서는 절대 사용 X

<br/>

### 속성 바인딩 (v-bind)

이중 중괄호는 HTML 속성에 사용할 수 없음 / 대신 `v-bind` 사용

```vue
<template>
  <div v-bind:title="dynamicTitle">마우스를 올려보세요.</div>
</template>
```

`Boolean` 속성은 속성 존재 자체가 `true`, `false` 를 의미하는 속성

```vue
<template>
  <input type="text" v-bind:disabled="isInputDisabled" />
</template>
```

### 단축표현

`v-bind` 는 매우 자주 사용하기 때문에 단축 문법 `:` 으로 사용

```vue
<template>
  <div :title="dynamicTitle">마우스를 올려보세요.</div>
  <input type="text" :disabled="isInputDisabled" />
</template>
```

### 다중 속성 바인딩

객체를 여러 속성을 한번에 바인딩 할 수 있음

```vue
<script>
const attrs = {
  id: 'password-id',
  type: 'password',
  placeholder: '비밀번호를 입력해주세요'
}
</script>
```

`v-bind` 을 인수 없이 사용하여 단일 요소에 바인딩할 수 있음

```vue
<template>
  <input v-bind="attrs" />
</template>
```

### JavaScript 표현식 사용

Vue 에서 모든 데이터 바인딩 내에서 JavaScript 표현식이 가능

```vue
<template>
  {{ isInputDisabled ? '예' : '아니오' }}
  {{ message.split('').reverse().join('') }}
  <input type="text" :placeholder="`입력해주세요 ${isInputDisabled}`" />
</template>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
