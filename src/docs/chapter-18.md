## Template refs

> Vue 의 선언적 렌더링 모델은 대부분 직접적인 DOM 의 작업을 대신 수행함

하지만 때론 기본 DOM 요소에 직접 접근해야 하는 경우가 존재하는데 이럴 때 ref 를 사용해 쉽게 접근함

```vue
<template>
  <input type="text" ref="input" />
</template>
```

ref 는 특수 속성.

**ref 특수 속성을 통해 마운트된 DOM 요소 또는 자식 컴포넌트에 대한 참조를 얻을 수 있음**

<br/>

### Ref 로 접근하기

Composition APi 로 잠조를 얻으려면 동일한 이름의 참조를 선언해야 함

- 컴포넌트가 마운트 된 후에 접근할 수 있음
- `<template>` 안에서 `input` 으로 `Refs` 참조에 접근하려는 경우 렌더링되기 전에는 참조가 `null` 일 수 있음
- `<template>` 안에서 `$refs` 내장 객체로 `Refs` 참조에 접근할 수 있음

```vue
<template>
  <input ref="input" type="text" />
  <div>{{ input }}</div>
  <div>{{ $refs.input }}</div>
</template>
<script>
import { onMounted, ref } from 'vue'

export default {
  components: {},
  setup() {
    const input = ref(null)

    onMounted(() => {
      input.value.value = 'Hello World!'
      input.value.focus()
    })

    return {
      input
    }
  }
}
</script>
```

<br/>

### v-for 내부 참조

`v-for` 내부에서 `ref` 가 사용될 때 `ref` 는 마운트 후 배열로 채워짐

```vue
<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const list = ref([1, 2, 3])
    const itemRefs = ref([])

    onMounted(() => console.log(itemRefs.value))

    return {
      list,
      itemRefs
    }
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

<br/>

### Function Refs

`ref` 속성에 문자열 키 대신 함수를 바인딩 할 수도 있음

```vue
<template>
  <input
    :ref="
      (element) => {
        /* assign element to a property or ref */
      }
    "
  />
</template>
``
```

<br/>

### Component Refs

`ref` 를 자식 컴포넌트에도 사용할 수 있음 `ref` 로 자식 컴포넌트에 참조값을 얻게 되면 자식 컴포넌트의 모든 속성과 메서드에 대한 전체를 접근할 수 있음

<br/>

이러한 경우 부모/자식 컴포넌트간 의존도가 생기기 때문에 이러한 방법은 반드시 필요한 경우에만 사용해야 함

일반적으로 Ref 보다 표준 props 를 사용하여 부모/자식간 상호작용을 구현해야 함

```vue
// Child.vue
<template>
  <div>Child Component</div>
</template>
<script>
import { ref } from 'vue'

export default {
  setup() {
    const message = ref('Hello Child')
    const sayHello = () => {
      alert(message.value)
    }

    return {
      message,
      sayHello
    }
  }
}
</script>
```

부모 컴포넌트에서 자식 컴포넌트의 상태나 메서드에 접근할 수 있음

```vue
// Child.vue
<template>
  <button @click="child.sayHello()">child.sayHello()</button>
  <Child ref="child"></Child>
</template>

<script>
import { onMounted, ref } from 'vue'
import Child from './components/templateRefs/Child.vue'

export default {
  components: {
    Child
  },
  setup() {
    const child = ref(null)
    onMounted(() => {
      console.log(child.value.message)
    })

    return { child }
  }
}
</script>
```

<br/>

### $parent

자식 컴포넌트에서 상위 컴포넌트를 참조하기 위해서는 `$parent` 내장객체를 사용할 수 있음

```vue
<template>
  <div>Child Component</div>
  <div>{{ $parent.message }}</div>
</template>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
