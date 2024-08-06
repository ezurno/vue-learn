## 컴포넌트 정의

> 컴포넌트를 정의하는 방법은 `Single File Component(SFC)` 를 사용하는 방법과 문자열 템플릿 `String template` 으로 정의하는 방법이 있음

### Single-File Component (SFC)

**빌드 도구를 사용할 때** 컴포넌트는 일반적으로 _Single File Component(SFC)_ 로 정의 할 수 있음

확장자 `*.vue` 를 가진 단일 파일

```vue
<template>
  <button @click="counter++">{{ counter }}</button>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const counter = ref(0)
    return {
      counter
    }
  }
}
</script>

<style></style>
```

<br/>

### 문자열 템플릿 (String Template)

빌드 도구를 사용하지 않을 때 Vue 옵션을 포함하는 일반 JavaScript 객체로 정의 할 수 있음

```javascript
import { ref } from 'vue/dist/vue.esm-bundler.js'
export default {
  setup() {
    const counter = ref(0)
    return {
      counter
    }
  }
  template: <button @click="counter++">클릭 횟수 {{counter}}</button>
}
```

> TIP
>
> vue.esm-bundler.js 란
>
> 런타임 컴파일러를 포함. 빌드 도구(vite) 를 사용하지만 여전히 런타임 문자열을 템플릿을 원하는 경우 이 옵션을 사용함
>
> 이 파일에 vue 의 별도 명칭을 지정하도록 번들러를 구성해야 함

<br/>

### 컴포넌트 등록

Vue 컴포넌트는 `<template>` 안에서 발견 되었을 때 Vue 가 구현 위치를 알 수 있도록 등록해야함

컴포넌트를 등록하는 방법은 크게 두가지가 있음

- 전역 등록 (Global Registration)
- 지역 등록 (Local Registration)

<br/>

#### 전역 등록

`ap.component()` 메서드를 사용하여 현재 `Vue 애플리케이션에서 전역적으로 사용`할 수 있도록 할 수 있음

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import GlobalComponent from './components/GlobalComponent.vue'

const app = createApp(App)
app.component('GlobalComponent', GlobalComponent).mount('#app')
```

`app.component()` 메서드는 다음과 같이 연결 할 수 있음

```javascript
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

**전역 등록된 컴포넌트는 어떤 곳에서든 사용이 가능함**

<br/>

#### 지역 등록

전역 등록은 편리하지만 몇가지 단점이 존재 함

1. Webpack (Vite) 와 같은 빌드 시스템을 이용하는 경우 컴포넌트를 전역등록 하는 것은 **컴포넌트를 사용하지 않더라도 계속해서 최종 빌드에 해당 컴포넌트가 포함** 되는 것을 의미함
2. 따라서 자바스크립트 파일의 크기를 불필요하게 증가시킴
3. 전역 등록을 계속하게 되면 애플리케이션의 컴포넌트간 종속관계를 확인하기 힘듦, 상위 하위 컴포넌트 구분이 힘들어짐 따라서 유지보수 하기가 힘들어짐

지역 등록된 컴포넌트는 `현재 컴포넌트 영역 안에서만 사용할 수 있음`

Vue 컴포넌트 인스턴스의 `components` 옵션을 사용해서 등록할 수 있음

```javascript
// ParentComponent.vue 파일
import ChildComponent from './ChildComponent.vue'

export default {
  components: {
    ChildComponent
  },
  setup() {
    // ...
  }
}
```

`ParentComponent` 컴포넌트에 로컬 등록된 `ChildComponent` 는 현재 컴포넌트인 `ParentComponent` 에서만 사용이 가능함

<br/>

### 컴포넌트 사용

등록된 컴포넌트는 `<template>` 에서 원하는 만큼 사용할 수 있음

```vue
<template>
  <h2>Single-File Component</h2>
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</template>
```

그리고 *컴포넌트는 사용할 때마다 해당 컴포넌트의 새 인스턴스가 생성*됨

사용할 때마다 `setup()` 함수가 실행 된다는 것을 의미

#### PascalCase

`Single-File Component(SFC)` 에서 기본 HTML 요소와 구분하기 위해 자식 컴포넌트에 PascalCase 이름을 사용하는 것이 좋음

기본 HTML 태그 이름은 대소문자를 수분하지 않지만 Vue SFC 는 컴파일된 형식이므로 대소문자 구분 태그 이름을 사용할 수 있음
