## Actions

### Actions 란

Actions 는 컴포넌트의 메서드와 동일 함. 그리고 defineStore()의 actions 속성으로 정의할 수 있으며 비즈니스 로직을 정의하는 데 완벽함

```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0
  }),
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    }
  }
})
```

Getter 와 마찬가지로 Actions 는 전체 타이핑 및 자동완성 지원을 통해 전체 store 인스턴스에 액세스할 수 있음

Actions 는 비동기식일 수 있으며 API 호출이나 다른 Actions 까지도 그 안에서 기다릴 수 있음

Mande 를 사용한 예제 (하단)

```javascript
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // let the form component display the error
        return error
      }
    }
  }
})
```

또한 원하는 매개변수를 자유롭게 설정하고 무엇이든 반환할 수 있음 Actions 를 호출하면 모든 것이 자동으로 추론 됨

Actions 는 메서드처럼 호출 됨

```javascript
export default defineComponent({
  setup() {
    const main = useMainStore()
    // Store의 메소드로 action 호출
    main.randomizeCounter()

    return {}
  }
})
```

<br/>

### 다른 Store Actions 에 접근하기

다른 Store 를 사용하려면 Actions 내에서 직접 사용할 수 있음

```javascript
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    }
  }
})
```

<br/>

### setup() 과 함께 사용

store 의 method 로 모든 actions 를 직접 호출 할 수 있음

```javascript
export default {
  setup() {
    const store = useStore()

    store.randomizeCounter()
  }
}
```

<br/>

### Options API와 함께 사용

#### setup() 함수와 함께

```javascript
import { useCounterStore } from '../stores/counterStore'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    }
  }
}
```

<br/>

#### setup() 함수 없이

Composition API 를 전혀 사용하지 않으려면 mapActions() helper 함수를 사용하여 컴포넌트의 메서드로 actions 속성을 매핑할 수 있음

```javascript
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counterStore'

export default {
  methods: {
		// 구성 요소 내부의 this.increment()에 대한 액세스를 제공합니다.
		// store.increment()에서 호출하는 것과 동일
    ...mapActions(useCounterStore, ['increment'])
		// 위와 같지만 this.myOwnName()으로 등록
    ...mapActions(useCounterStore, { myOwnName: 'doubleCounter' }),
  },
}
```

<br/>

### actions 구독

`store.$onAction()` 을 사용하여 actions 결과를 관찰할 수 있음. 전달된 콜백은 actions 자체보다 먼저 실행 됨

에프터 핸들은 약속하고 작업이 해결된 후 함수를 실행할 수 있도록 함. 비슷한 방식으로 onError 를 사용하면 액션이 throw 되거나

거부되는 경우 함수를 실행할 수 있음 => 런타임에 오류를 추적하는데에 유용함

작업을 실행하기 전과 해결/거부 한 후 기록하는 예제

```javascript
const unsubscribe = someStore.$onAction(
  ({
    name, // 액션의 이름
    store, // 인스턴스 저장, `someStore`와 동일
    args, // 액션에 전달된 매개변수의 배열
    after, // 액션이 반환되거나 해결된 후 후크
    onError // 액션이 throw되거나 거부되면 후크
  }) => {
    // 이 특정 액션 호출을 위한 공유 변수
    const startTime = Date.now()
    // 이것은 `store`에 대한 작업이 실행되기 전에 트리거됩니다.
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 작업이 성공하고 완전히 실행된 후에 트리거됩니다.
    // 반환된 약속을 기다립니다.
    after((result) => {
      console.log(`Finished "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}.`)
    })

    // 액션이 거부하는 프라미스를 던지거나 반환하면 트리거됩니다.
    onError((error) => {
      console.warn(`Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`)
    })
  }
)

// 리스너를 수동으로 제거
unsubscribe()
```

기본적으로 actions 구독은 추가된 컴포넌트에 바인딩 됨 (저장소가 setup() 내부에 있는 경우)

컴포넌트가 마운트 해제되면 자동으로 제거 됨. 컴포넌트가 마운트 해제된 후에도 이를 유지하려면

true 를 두 번째 인수로 전달하여 현재 구성요소에서 actions 구독을 분리함

```javascript
export default {
  setup() {
    const someStore = useSomeStore()

    // this subscription will be kept after the component is unmounted
    someStore.$onAction(callback, true)

    // ...
  }
}
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
