## Events

자식 컴포넌트에서도 부모 컴포넌트로 데이터를 전달 또는 트리거의 목적으로 이벤트를 내보내는 것

이벤트는 컴포넌트의 `emit` 을 통해서 발생 시킬 수 있음

<br/>

### 이벤트 발생 및 수신

컴포넌트의 `<template>` 블록 안에서 내장 함수 `$emit()` 을 사용하여 직접 커스텀한 이벤트를 내보낼 수 있음

```vue
<template>
  <button @click="$emit(`someEvent`)">버튼</button>
</template>
```

그러면 부모 컴포넌트에서 `v-on` 또는 `@` 를 사용하여 이벤트를 수신 할 수 있음

```vue
<template>
  <MyComponent @some-event="callFunction" />
</template>
```

`.once` 수식어는 컴포넌트 커스텀 이벤트에서도 지원 됨

```vue
<template>
  <MyComponent @some-event.once="callFunction" />
</template>
```

<br/>

### 이벤트 파라미터

이벤트와 함께 특정 값을 내보낼 수 있음. `$emit` 함수 이벤트명에 추가로 파라미터를 넘길 수 있음

```vue
<template>
  <button @click="$emit(`someEvent`, `Hello`, `World`, `!!!`)">버튼</button>
</template>
```

그런 다음 부모 컴포넌트에서 이벤트와 함께 파라미터를 받을 수 있음

```vue
<template>
  <MyComponent @some-event="callFunction" />
</template>

<script setup>
export default {
  setup() {
    const callFunction = (word1, word2, word3) => {
      alert(word1, word2, word3)
    }

    return {
      callFunction
    }
  }
}
</script>
```

<br/>

### 이벤트 선언하기

Vue3 에서는 `emits` 옵션을 사용하여 이벤트를 선언할 수 있음

이때 이벤트 선언하는 방법은 두가지가 있음

- 문자열 배열 선언
- 객체 문법 선언

그리고 JavaScript 코드에서 이벤트를 내보낼 때에는 `setup()` 함수의 파라미터로 넘어온 `context.emit()` 메서드를 사용할 수 있음

<br/>

#### 문자열 배열 선언

```vue
<script>
export default {
  emits: ['someEvent'],
  setup(props, context) {
    context.emit('someEvent', 'Hello World')
  }
}
</script>
```

```vue
<script>
export default {
  emits: ['someEvent'],
  setup(props, { emit }) {
    emit('someEvent', 'Hello World')
  }
}
</script>
```

<br/>

#### 객체 문법 선언

객체 문법으로 선언할 경우 `validation` 로직을 추가할 수 있음

```vue
<script>
export default {
  emits: {
    // 유효성 검사각 없는 이벤트 선언
    someEvent: null
  },ax
  someSubmit: (result) => {
    if (email && password) {
      return true
    } else {
        console.warn('result 값이 비어있습니다!`)
        return false
    }
  }
  setup(props, context) {
    context.emit('someEvent', 'Hello World!')
  }
}
</script>
```

> 선택사항이지만 컴포넌트가 작동하는 방식을 `v-model`을 적용하려면 `@update:modalValue` 이벤트를 사용하여 `v-model` 을 만들 수 있음

<br/>

### v-model 만들기

컴포넌트를 만든 후 해당 컴포넌트에 `v-model` 을 적용하려면 `@update:modelValue` 이벤트를 사용하여 `v-model` 을 만들 수 있음

일반적으로 기본 HTML 요소인 `<input>` 태그에 `v-model` 은 아래와 같이 사용

```vue
<template>
  <input v-model="username" />
</template>
```

위에 선언된 `v-model` 은 아래와 같이 동작

```vue
<template>
  <LabelInput :modelValue="username" @update:modelValue="(newValue) => (username = newValue)" />
</template>
```

이 `<LabelInput>` 을 실제로 동작하게 하려면 아래와 같이 컴포넌트를 정의해야 함

- `modelValue` `props` 를 `:value` 속성에 바인딩
- `@input` 이벤트에서 새 `@update:modelValue` 이벤트로 내보냄

```vue
<template>
  <label>
    {{ label }}
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', '$event.target.value')"
    />
  </label>
</template>
<script>
export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue']
}
</script>
```

아래와 같이 컴포넌트에 `v-model` 을 적용 가능

```vue
<template>
  <LabelInput label="이름" v-model="username" />
</template>
```

<br/>

### Computed 이용하기

컴포넌트 안에서 computed 를 사용하여 v-model 을 구현할 수 있음

```vue
<template>
  <label>
    {{ label }}
    <input type="text" v-model="value" />
  </label>
</template>
<script>
import { computed } from 'vue'

export default {
  props: ['modelValue', 'label'],
  emits: ['update:modelValue'],
  setup(props, context) {
    const value = computed({
      get() {
        return props.modelValue
      },
      set(value) {
        context.emit('update:modelValue', value)
      }
    })

    return {
      value
    }
  }
}
</script>
```

`computed` 로 전달 할 수 있으며 이럴 때 `emit` 을 사용할 수 있음

`<BlogPost>` 컴포넌트를 개발할 때 부모에게 다시 무엇을 전달해야 할 때가 있음

```vue
// ParantComponent 블로그 게시글 폰트 크기를 확대하는 기능이 있을 때를 가정...
<script>
const postFontSize = ref(1)
</script>

<template>
  <div :style="{ fontSize: postFontSize + 'em' }">
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :title="post.title"
      @enlarge-text="postFontSize += 0.1"
    />
  </div>
</template>
```

```vue
// ChildComponent
<template>
  <article>
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">크게</button>
  </article>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: ['title'],
  emits: ['enlarge-text'],
  setup(props) {
    const { title } = toRefs(props)
    return {
      title
    }
  }
}
</script>
```

자식 컴포넌트에서 `emit` 옵션을 사용하여 이벤트를 선언, `$emit` 내장 메서드를 호출하여 이벤트를 발생 시킬 수 있음

부모 컴포넌트에서는 `v-on (@)` 디렉티브를 사용하여 자식 컴포넌트로부터 전달받은 이벤트를 수신

<br/>

### v-model 전달인자

기본적으로 `v-model` 은 컴포넌트에서 `modelValue` `props` 와 `update:modelValue` 이벤트로 사용

하지만 `arguments` 를 사용하여 이러한 이름을 수정 할 수 있음

```vue
<template>
  <BookCompoent v-model:title="bookTitle" />
</template>
```

이 경우 자식 컴포넌트에서는 `:title` 을 속성으로 정의하고 `update:title` 로 이벤트를 내보내야 함

```vue
<template>
  <article>
    <strong>책 이름</strong>
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
  </article>
</template>

<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>
```

### 다중 v-model 바인딩

`v-model argument` 를 사용하여 컴포넌트에 여러 `v-model` 을 바인딩 할 수 있음

```vue
<template>
  <BookComponent v-model:title="bookTitle" v-model:author="bookAuthor" />
</template>
```

```vue
<template>
  <article>
    <strong>도서명</strong> :
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
    <br />
    <strong>저자</strong> :
    <input type="text" :value="author" @input="$emit('update:author', $event.target.value)" />
  </article>
</template>

<script>
export default {
  props: ['title', 'author'],
  emits: ['update:title', 'update:author']
}
</script>
```

<br/>

### v-model 수식어(Modifiers) 핸들링

필요에 따라 `v-model` 의 수식어를 추가할 수 있음

ex) 첫글자를 대문자로 표시하는 capitalize 라는 수식어를 만들어봄

```vue
<template>
  <CustomInput v-model.capitalize="username" />
</template>
```

컴포넌트에 추가된 modifier 는 `modelModifiers` 라는 props 를 통해 컴포넌트에 전달이 됨

아래 예제에서 기본값을 빈 객체를 갖는 `modelModifiers` 를 props 를 갖는 컴포넌트

```vue
<template>
  <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: { default: () => ({}) }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    // {capitalize: true} 출력
    console.log(props.modelModifiers)
  }
}
</script>
```

컴포넌트의 `modelModifiers` prop 에 `capitalize` 가 포함되어 있고 이 값은 `true` 로 출력되는 것을 확인할 수 있음

(부모 컴포넌트에서 `v-model.capitalize` 를 사용했기 때문에)

이제 이벤트를 내보내기 전에 문자열 첫글자를 대문자로 만들면 됨

완성 예시

```vue
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: { default: () => ({}) }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const emitValue = (e) => {
      let value = e.target.value
      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      emit('update:modelValue', value)
    }
    return {
      emitValue
    }
  }
}
</script>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
