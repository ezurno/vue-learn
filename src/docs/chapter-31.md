## Getters

Getter 는 Store 상태에 대한 `computed` 와 정확히 동일함

`defineStore()` 의 `getters` 속성으로 정의 할 수 있음 화살표 함수의 사용을 장려하기 위해 첫 번째 매개변수로 `state` 를 받음

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  }
})
```

대부분의 경우 `getter` 는 `state` 에만 의존하지만 다른 getter 를 사용해야 할 수도 있음 이 때문에 일반적인 함수를 정의 할 때 이를 통해 저장소 인스턴스에 대한 엑세스를 할 수 있지만 리턴 타입의 타입을 정의해야 함. Typescript 의 알려진 제한으로 인한 것이며 화살표 함수로 정의된 getter 나 이것을 사용하지 않는 getter 에 영향을 미치지 않음

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // // 자동으로 리턴 타입을 숫자로 유추합니다.
    doubleCount(state) {
      return state.counter * 2
    },
		// 리턴 타입은 **반드시** 명시적으로 설정되어야 합니다.
    doublePlusOne(): number {
			// 전체 Store에 대한 자동 완성 및 입력 ✨
      return this.doubleCount + 1
    },
  },
})
```

그런 다음 Store 인스턴스에서 직접 getter 에 엑세스 할 수 있음

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useStore()

    return { store }
  }
}
</script>
```

<br/>

### 다른 getter 에 접근

`computed` 와 마찬가지로 여러 getters 를 결합할 수 있음

이를 통해 다른 Getter 에 엑세스 하면 됨 TS 를 사용하지 않더라도 JSDoc 을 사용하여 유형에 대해 IDE 에 힌트를 줄 수 있음

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0
  }),
  getters: {
    // `this`를 사용하지 않기 때문에 유형이 자동으로 유추됩니다.
    doubleCount: (state) => state.counter * 2,
    // 여기에 유형을 직접 추가해야 합니다(JS에서 JSDoc 사용). 우리는 또한 할 수 있습니다
    // 이것을 사용하여 getter를 문서화합니다.
    /**
     * 카운터 값 곱하기 2 더하기 1을 반환합니다.
     *
     * @returns {숫자}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    }
  }
})
```

<br/>

### getter 에 매개변수 전달

getter 에서 함수를 변환하여 모든 매개변수를 받을 수 있음

```javascript
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    }
  }
})
```

컴포넌트에서 사용

```vue
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  }
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

이 작업을 수행할 때 `getter` 는 더 이상 캐시되지 않으며 단순히 호출하는 함수. 그러나 getter 자체 내부에 일부 결과를 캐시할 수 없음

```javascript
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    }
  }
})
```

<br/>

### 다른 Store getters 에 접근

다른 Store getter 를 사용하려면 getter 내부에서 직접 사용할 수 있음

```javascript
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    }
  }
})
```

<br/>

### setup() 에서 사용

```javascript
export default {
  setup() {
    const store = useStore()

    store.counter = 3
    store.doubleCount // 6
  }
}
```

<br/>

### Options API 에서 사용

#### setup() 함수와 사용

```javascript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return counterStore.doubleCounter * 2
    }
  }
}
```

<br/>

#### setup() 함수 없이 사용

이전 상태 섹션에서 사용한 것과 동일한 `mapState()` 함수를 사용하여 getter 에 매핑 할 수 있음

```javascript
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // gives access to this.doubleCounter inside the component
    // same as reading from store.doubleCounter
    ...mapState(useCounterStore, ['doubleCount'])
    // same as above but registers it as this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCounter',
      // you can also write a function that gets access to the store
      double: store => store.doubleCount,
    }),
  },
}
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
