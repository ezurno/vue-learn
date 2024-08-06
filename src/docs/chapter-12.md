## Props

> 컴포넌트에 각각 제목이나 내용과 같은 정보를 전달해야 할 때 `props` 를 사용하여 컴포넌트로 데이터를 전달할 수 있음

### Props 란?

> 컴포넌트에 등록할 수 있는 _사용자 정의 속성_

컴포넌트를 사용하는 부모 컴포넌트에서 데이터를 전달 할 수 있음

### Props 선언

Vue 컴포넌트에서는 명시적인 `props` 선언이 필요함

컴포넌트에 전달 된 외부 props 가 fallthrough 속성으로 처리되어야 함을 알 수 있음

> TIP
>
> **Fallthrough 속성**
>
> props 또는 emits 에 명시적으로 선언되지 않은 속성 또는 이벤트

<br/>

#### 문자열 배열 선언

컴포넌트에 `props` 옵션을 사용하여 선언할 수 있음

```javascript
// BlogPost.vue
export default {
  props: ['title'],
  setup(props) {
    console.log(props.title)
  }
}
```

<br/>

#### 객체 문법 선언

문자열 배열을 사용하여 props 선언하는 것 외에도 객체 문법을 사용하여 속성 타입과 함께 선언 가능

```javascript
export default {
  props: {
    title: String,
    likes: Number
  },
  setup(props) {
    console.log(props.title)
    console.log(props.like)
  }
}
```

`props` 선언 시 `key` 는 속성명이고 `value` 는 속성 타입

```javascript
{
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,
  // Multiple possible types
  propB: [String, Number],
  // Required string
  propC: {
    type: String,
    required: true
  },
  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },
  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function
    default() {
      return { message: 'hello' }
    }
  },
  // Custom validator function
  propF: {
    validator(value) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  }
```

<br/>

- `type` : `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol` 등 모든 기본 생성자 및 사용자 정의 타입이 올 수 있음
- `[Number, String]` 처럼 배열을 이용하여 여러개 타입을 선언할 수 있음
- `default` : 속성값이 비어 있거나 `undefined` 를 전달 받는 경우 기본값을 선언할 수 있음
- 객체 또는 배열 타입인 경우 기본값을 팩토리 함수를 사용하여 반환
- `required` : 속성이 필수 값이라면 `true` 로 해서 설정 가능
- `validator` : 속성값의 유효성 검사가 필요할 때 사용할 수 있음

컴포넌트 사용 시 `type`, `required`, `validator` 명시된 사항을 위반할 때 개발모드에서 콘솔 경고가 발생

### Props 사용

- 선언된 props 를 `<template>` 에서 바로 사용 할 수 있음

```vue
<template>
  <p>{{ title }}</p>
</template>
```

- `setup()` 함수의 첫 번째 매개변수로 props 객체를 받아 사용할 수 있음

```javascript
export default {
  setup(props) {
    return {}
  }
}
```

- 컴포넌트 인스턴스(this) 의 `$props` 객체로 접근할 수 있음 _Options API_

```vue
<template>
  <p>{{ $props }}</p>
</template>

<script>
export default {
  created() {
    // 객체로 접근
    this.$props

    this.title
  }
}
</script>
```

### Props Name Casing

- `props` 선언시에는 camelCase 를 사용하여 이름을 선언 속성키로 사용할 때 따옴표를 사용할 필요가 없고 유효한 JavaScript 식별자이기 때문에 템플릿 표현식에서 직접 참조할 수 있기 때문

```vue
<script>
export default {
  props: {
    greetingMessage: String
  }
}
</script>

<template>
  <span>{{ greetingMessage }}</span>
</template>
```

- 속성에 값을 전달할 때는 `kebab-case` 를 사용하는 것을 권장

```vue
<template>
  <MyComponent greeting-message="hello"></MyComponent>
</template>
```

<br/>

### 객체를 사용하여 다중 속성 전달

객체의 모든 속성을 props 로 전달하려는 경우 `v-bind` 에 `전달인자(v-bind:prop-name)` 없이 사용할 수 있음

```vue
<script>
export default {
  setup() {
    const post = ref({
      id: 1,
      title: 'Learn Vue3'
    })

    return {
        post
    }
  }
}
</script>

<template>
  <!-- 객체를 사용한 다중 속성 전달(전달인자 없음) -->
  <BlogPost v-bind="post" />

  <BlogPost :id="post.id" :title="post.title">
</template>
```

<br/>

### 단방향 데이터 흐름

모든 `props` 는 상위 속성과 하위 속성 간에 단방향 바인딩으로 형성되어 있음 만약 상위 속성이 업데이트되면

하위 속성도 업데이트 되지만 그 반대는 그렇지 않음. 이러한 성질은 하위 속성 변경 실수로 상위 속성을 변경하여

앱의 데이터 흐름을 이해하기 어렵게 만드는 것을 방지 할 수 있음

<br/>

또한 상위 컴포넌트가 업데이트 될 때마다 하위 컴포넌트의 모든 `props` 는 최신 상태도 초기화 됨

그렇기 때문에 **자식 컴포넌트 내부에서 `props` 를 변경하지 않아야 함**

```vue
<script>
export default {
  props: ['title'],
  setup(props) {
    // waring, props are readonly !!
    props.title = 'changed title'
  }
}
</script>
```

일반적으로 props 를 하위 컴포넌트에서 변경하고 싶은 두가지 경우가 있음

1. props 는 초기 값을 전달하는 데 사용 됨 자식 컴포넌트에서 속성 값을 로컬 데이터 속성으로 사용하고자 할 때임. 이경우 props 를 초기 값으로 사용하는 로컬 변수를 선언하는 것이 가장 좋음

```vue
<script>
export default {
  props: ['initialWidth', 'initialHeight'],
  setup(props) {
    // width 는 props.initialWidth 값으로 초기화 됨
    // 향후 props 업데이트의 연결이 끊어짐
    const width = ref(props.initialWidth)
    const height = ref(props.initialHeight)

    return {
      width,
      height
    }
  }
}
</script>
```

2. props 의 값의 변환이 필요할 때. 이 경우에는 `computed` 를 사용하면 좋음. 또한 상위 속성의 변경을 유지 할 수 있음

```vue
<script>
export default {
  props: ['size'],
  setup(props) {
    // 향후 props 업데이트의 연결이 유지됩니다. 끊어집니다.
    const rectangleSize = computed(() => props.size.trim().toUpperCase())
  }
  return {
    rectangleSize
  }
}
</script>
```

<br/>

#### 객체 / 배열 Props 업데이트

객체(object) 나 배열(array) 이 props 로 전달되면 자식 컴포넌트에서는 props 바인딩(값 변경) 을 변경할 수 없지만 객체 또는 배열의 중첩 속성은 변경할 수 있음

JavaScript 에서 객체와 배열이 참조타입 (Reference Type) 으로 전달되고 Vue 가 이러한 변경을 방지하는 것은 부당한 비용이 들기 때문

<br/>

이러한 변경의 단점은 하위 컴포넌트가 상위 컴포넌트에 명확하지 않은 방식으로 상위 속성 업데이트를 하게 되면 잠재적으로 향후 데이터 흐름을 추론하기 어렵게 만든다는 것을 의미함

그렇기 때문에 가장 좋은 방법은 부모와 자식이 의도적으로 밀접하게 연관되어 있지 않는한 이러한 변경은 피하는 것이 좋음

만약 변경이 필요하다면 자식 컴포넌트에서 **`emit` 을 이용하여 부모 컴포넌트가 스스로 변경을 수행할 수 있도록** 이벤트를 내보내야 함

<br/>

### Boolean Casting

`boolean` 타입의 props 는 특별한 캐스팅 규칙이 있음

```vue
<script>
export deafult {
    props: {
        disabled: Boolean
    }
}
</script>

<template>
  <!-- :disabled="true" 전달하는 것과 동일 -->
  <MyComponent disabled />

  <!-- :disabled="false" 전달하는 것과 동일 -->
  <MyComponent />
</template>
```

<br/>

### 반응형을 잃지 않는 구조분해 할당

- `toRef`
- `toRefs`
