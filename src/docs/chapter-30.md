## Store

### Store 정의

Store 는 `defineStore()` 를 사용해서 정의 함 또한 매개변수로 고유한 이름을 전달해야 함

```javascript
//store.js
import { defineStore } from 'pinia'

// useStore는 useUser, useCart 와 같을 수 있음
// 첫 번째 인수는 애플리케이션 전체에서 스토어의 고유 ID 입니다
export const useStore = defineStore('main', {
  // 다른 옵션
})
```

id 라고도 하는 이 이름은 꼭 필요한 값이며 Pinia 에서 Store 를 devtools 에 연결하는 데에 사용함

또한 반환된 함수의 이름은 `use ...` 로 지정하는 것은 사용법을 관용적으로 만들기 위한 composables 전반에 걸친 규칙임

<br/>

### Store 사용하기

`setup()` 함수 내부에서 `useStore()` 가 호출될 때까지 Store 가 생성되지 않기 때문에 Store 를 정의하고 있음

```vue
<script>
import { useStore } from '@/stores/counter'

export default {
  setup() {
    const store = useStore()

    return {
      // 템플릿에서 사용하기 위해 전체 스토어 인스턴스를 반환할 수 있음
      store
    }
  }
}
</script>
```

원하는 만큼 Store 를 정의할 수 있으며 pinia 를 최대한 활용하려면 각 Store 를 다른 파일에 정의해야 함

Store 가 인스턴스화 되면 `store` 에서 직접 `state`, `getters`, `actions` 에 정의된 모든 속성에 엑세스 할 수 있음

`store` 는 `reactive` 로 래핑된 객체

따라서 .value 로 가져올 필요가 없음 그러나 구조를 분해해서 재할당 할 수 없음

```javascript
// store.js
export default defineComponent({
  setup() {
    const store = useStore()
    // 반응성을 깨트리기 때문에 작동하지 않음
    const { name, doubleCount } = store

    name // "eduardo"
    doubleCount // 2

    return {
      // 항상 eduardo 가 출력
      name,
      // 항상 값이 2
      doubleCount,
      // 이것은 반응적
      doubleValue: computed(() => store.doubleCount)
    }
  }
})
```

반응성을 유지하면서 Store 에서 속성을 추출하려면 `storeToRefs()` 를 사용해야 함

따라서 모든 반응 속성에 대한 참조를 생성. `store` 의 `state` 만 사용하고 `actions` 를 호출하지 않을 때 유용함

Store 자체에도 바인딩이 되므로 `store` 에서 직접 `actions` 를 구조분해 할당할 수 있음

```javascript
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // `name`과 `doubleCount`는 반응형 참조입니다.
		// 플러그인에 의해 추가된 속성에 대한 참조도 생성됩니다.
		// 그러나 모든 작업 또는 비반응성(비 참조/반응성) 속성을 건너뜁니다.
    const { name, doubleCount } = storeToRefs(store)
		// increment action은 그냥 추출될 수 있습니다.
    const { increment } = store

    return {
      name,
      doubleCount
      increment,
    }
  },
})
```

<br/>

### State

`state` 는 대부분의 경우 상점의 중심 부분, 개발자들은 대부분 앱을 나타내는 `state` 를 정의 하는 것으로 시작함

Pinia 에서 `state` 는 초기 값을 리턴하는 함수로 정의 됨

이러한 `state` 는 서버, 클라이언트 모두 작동할 수 있음

```javascript
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 전체 타입 추론에 권장되는 화살표 함수
  state: () => {
    return {
      // 이 모든 속성은 자동으로 유형이 유추됩니다.
      counter: 0,
      name: 'Eduardo',
      isAdmin: true
    }
  }
})
```

<br/>

#### state 접근하기

기본적으로 `store` 인스턴스를 통해 `state` 에 접근하여 직접 읽고 쓸 수 있음

```javascript
const store = useStore()
store.counter++
```

<br/>

#### Options API 사용

##### setup() 함수와 함께

```javascript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    tripleCounter() {
      return this.counterStore.counter * 3
    }
  }
}
```

<br/>

##### setup() 함수 없이

Composition APi 를 사용하지 않고 `computed` 만 사용하는 경우, `mapState()` helper 함수를 사용하여 `state` 속성을 읽기 전용 `computed` 속성으로 매핑 할 수 있음

```javascript
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  computed: {
    // 구성 요소 내부의 this.counter에 대한 액세스 권한을 부여합니다.
		// store.counter에서 읽는 것과 동일
    ...mapState(useCounterStore, ['counter'])
    // 위와 같지만 this.myOwnName으로 등록
    ...mapState(useCounterStore, {
      myOwnName: 'counter',
      // 스토어에 액세스하는 함수를 작성할 수도 있습니다.
      double: store => store.counter * 2,
      // `this`에 액세스할 수 있지만 올바르게 입력되지 않습니다...
      magicValue(store) {
        return store.someGetter + this.counter + this.double
      },
    }),
  },
}
```

<br/>

#### state 초기화

`store` 에서 `$reset()` 메서드를 호출하여 상태를 초기값으로 재설정 할 수 있음

```javascript
const store = useStore()
store.$reset()
```

<br/>

#### state 변경하기

`store.counter++` 로 `store` 를 직접 변경하는 것 외에도 `$patch` 메소드를 호출할 수도 있음

`state` 객체의 일부분을 매개변수로 전달하여 여러개의 값을 변경할 수 있음

```javascript
store.$patch({
  counter: store.counter + 1,
  name: 'Abalam'
})
```

하지만 객체의 일부 변경으로 배열의 변경을 수행(푸시, 제거, 연결) 하려면 적용이 힘들거나 비용이 발생할 수 있음

이때 `$patch` 메서드에 콜백 함수를 전달하여 해결할 수 있음

```javascript
cartStore.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

여기서 주요 차이점은 `$patch()` 를 사용하면 여러 변경 사항을 devtools 의 단일 항목으로 그룹화 할 수 있다는 것

`state` 와 `$patch()` 에 대한 직접적인 변경은 devtools 에 나타나며 시간여행이 가능함

<br/>

#### state 교체

`$state` 속성을 새 객체로 설정하여 저장소의 전체 상태를 바꿀 수 있음

```javascript
store.$state = { counter: 666, name: 'Paimon' }
```

pinia 인스턴스의 상태를 변경하여 애플리케이션의 전체 상태를 바꿀 수도 있음

```javascript
pinia.state.value = {}
```

<br/>

#### state 구독

Vuex 의 `subscribe` 메소드와 유사하게 스토어의 `$subscribe()` 메소드를 통해 상태와 변경사항을 볼 수 있음

일반 `watch()` 보다 `$subscribe()` 를 사용하는 이점은 구독이 패치 후에 한 번만 트리거된다는 것

```javascript
cartStore.$subscribe((mutation, state) => {
  // 'pinia'에서 { MutationType } 가져오기
  mutation.type // 'direct' | 'patch object' | 'patch function'
  //cartStore.$id와 동일
  mutation.storeId // 'cart'
  // mutation.type === 'patch object'에서만 사용 가능
  mutation.payload // cartStore.$patch()에 전달된 패치 객체

  // 변경될 때마다 전체 상태를 로컬 스토리지에 유지
  localStorage.setItem('cart', JSON.stringify(state))
})
```

기본적으로 상태구독은 추가된 컴포넌트에 바인딩이 됨 (저장소가 컴포넌트의 `setup()` 의 내부에 있는 경우)

컴포넌트가 마운트 해제 되면 자동으로 제거 됨

컴포넌트가 마운트 해제된 이후에도 이를 유지하려면 `{detached: true}` 를 두 번째 인수로 전달하여 현재 컴포넌트에서 상태구독을 분리

```javascript
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$subscribe(callback, { detached: true })

    // ...
  }
}
```

> TIP
>
> `pinia` 인스턴스의 전체 상태를 볼 수 있음

```javascript
watch(
  pinia.state,
  (state) => {
    // persist the whole state to the local storage whenever it changes
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

- Vuex 와 다르게 state 를 직접 변경 가능
- Vuex 와 다르게 mutation 개념이 없어졌음
  - 결국 개념이 더 단순해지고 구조가 간결해짐

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
