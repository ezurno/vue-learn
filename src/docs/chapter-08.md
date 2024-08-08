## Watch, WatchEffect

### Watch

우리는 종종 반응형 상태가 변경되었을 때에 감지하여 다른 작업을 수행해야 할 경우가 있음

ex) 상태가 변경 되었을 떄 DOM 변경, 비동기 작업을 한 후 다른 상태 변경...

Composition API 의 `watch` 함수를 사용하여 반응형 상태가 변경될 때마다 특정 작업을 수행할 수 있습니다.

```vue
<script>
const message = ref('hello world!')

// message 데이터 변경에
watch(message, (newValue, oldvalue) => {
  console.log('newValue: ', newValue)
  console.log('oldValue: ', oldValue)
  // 어떠한 작업을 수행하는 "감시자" 역할
})
</script>
```

### Watch Source Type

```vue
<script>
watch(/*Source Type*/, (newValue, oldValue) => {})
</script>
```

`watch` 의 첫번 째 매개변수는 다양한 타입이 될 수 있음

- `ref`
- `reactive`
- `computed`
- `getter`
- `array`

```vue
<script>
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter
watch(
  () => x.value + y.value,
  (sum) => console.log(`sum of x + y is : ${sum}`)
)
</script>
```

다음과 같이 반응형 객체의 속성은 볼 수 없음

```vue
<script>
const obj = reactive({ count: 0 })

// 숫자(number) 를 전달하기 때문에 작동하지 않음
watch(obj.count, (newValue) => {
  console.log(`newValue : ${newValue}`)
})
</script>
```

**대신 getter 를 사용하면 됨**

```vue
<script>
const obj = reactive({ count: 0 })
watch(() => obj.count, (newValue) => console.log(`newValue : ${newValue}`)
</script>
```

<br/>

### deep option

반응형 객체를 직접 `watch()` 하면 암시적으로 깊은 감시자가 생성 됨

=> 즉 속성 뿐만 아니라 모든 중첩된 속성에도 트리거 됨

```vue
<script>
const person = reactive({
  name: '홍길동',
  age: 30,
  hobby: '운동',
  obj: {
    count: 0
  }
})

watch(person, (newValue) => console.log(`newValue : ${newValue}`))
</script>
```

`getter function` 으로 객체를 넘길 경우에는 `객체의 값`이 바뀔 경우에만 트리거 됨

즉 중첩된 속성은 트리거 되지 않음

```vue
<script>
watch(
  () => person.obj,
  (newValue) => {
    // 객체의 값이 바뀔 경우에만 트리거 됨
  }
)
</script>
```

`deep` 옵션을 사용하면 깊은 감시자로 강제할 수 있음

```vue
<script>
watch(
  () => person.obj,
  (newValue) => {
    console.log(`newValue : ${newValue}`)
  },
  {
    deep: value
  }
)
</script>
```

> deep 옵션은 큰 데이터 구조에서 사용할 때 비용이 많이 들 수 있음
>
> 필요한 경우에만 사용하고 성능 영향에 주의해야 함

<br/>

### Immediate 즉시실행

`immediate` 옵션을 사용하여 최초에 즉시실행 할 수 있음

```vue
<script>
const message = ref('Hello World!')
const reverseMessage = ref('')

watch(message, (newValue) => {
  reverseMessage.value = newValue.split('').reverse().join('')
})
</script>
```

또는 함수를 외부에 선언하여 즉시 실행 할 수 있음 (WatchEffect 로 단순화 가능)

```vue
<script>
const message = ref('Hello World!')
const reverseMessage = ref('')

const reverseFn = () => {
  reverseMessage.value = newValue.split('').reverse().join('')
}
watch(message, reverseFn)
// 즉시실행
reverseFn()
</script>
```

<br/>

### Computed vs Watch

`computed` 와 `watch` 둘 다 비슷한 역할을 할 수 있음

- **computed**

```vue
<script>
const reverseMessage = computed(() => message.value.split('').reverse().join(''))
</script>
```

- **watch**

```vue
<script>
watch(message, (newValue) => {
  reverseMessage.value = newValue.split('').reverse().join('')
})
</script>
```

#### 어떻게 사용할 것인가

- **computed**
  - Vue 인스턴스의 상태(ref, reactive 변수) 의 종속관계를 자동으로 세팅하고자 할 때는 `computed` 로 구현하는 것이 좋음
  - `reverseMessage` 는 `message` 값에 따라 결정되어지는 종속관계에 있음
  - 이 종속관계 코드가 복잡해지면 `watch` 로 구현할 경우 더 복잡해지거나 중복계산 또는 오류를 발생시킬 수 있음
- **watch**
  - Vue 인스턴스의 상태(ref, reactive 변수) 의 변경 시점에서 특정 액션 (call API, push route 등) 을 취하고자 할 때 적합
  - 대부분 `computed` 로 구현 가능한 것이라면 `watch` 가 아닌 `computed` 로 구현하는 것이 좋음

<br/>

### WatchEffect

`WatchEffect` 는 콜백함수 안의 반응성 데이터에 변화가 감지되면 자동으로 반응하여 실행

그리고 `WatchEffect` 의 코드는 컴포넌트가 실행될 때 즉시 실행 됨

```vue
<script>
watchEffect(async () => {
  const { data } = await axios.get(`https://reqres.in/api/users?page=${page.value}`)
  items.value = data.data
})
</script>
```

<br/>

#### watch vs watchEffect

`watch` 와 `watchEffect` 둘 다 관련 직업 (api call, push route 등)을 반응적으로 수행할 수 있게 해줌

하지만 주요한 차이점은 관련된 반응형 데이터를 추적하는 방식

- `watch`
  - 명시적으로 관찰된 소스만 추적
  - 콜백 내에서 액세스한 항목은 추적하지 않음
  - 또한 콜백은 소스가 실제로 변경된 경우에만 트리거
  - 종속성 추적을 부작용과 분리하여 콜백이 실행되어야 하는 시기를 보다 정확하게 제어 할 수 있음
- `watchEffect`
  - 종속성의 추적과 부작용을 한단게로 결합
  - 동기 실행 중에 액세스되는 모든 반응 속성을 자동으로 추적
  - 더 편리하고 간결한 코드를 생성하지만 반응형 종속성을 덜 명시적으로 만들어버림

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
