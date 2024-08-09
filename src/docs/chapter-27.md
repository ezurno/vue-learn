## toRef

반응형 객체의 속성을 하나의 ref 객체로 만들 때 사용

생성된 ref 객체는 원본 반응형 객체의 속성과 동기화 되고 원본 속성을 변경하면 ref 객체가 업데이트 됨

```vue
<script>
const state = reactive({
  foo: 1,
  bar: 2
})

const fooRef = toRef(state, 'foo')

// 참조를 변경하면 원본이 업데이트 됨
fooRef.value++
console.log(state.foo) // 2

// 원본을 변경하면 ref 도 업데이트 됨
state.foo++
console.log(fooRef.value) // 3
</script>
```

기존에 쓰는 방법대로 ref 를 사용하면 반응형을 잃게 된다.

```javascript
const fooRef = ref(state.foo)
```

위의 ref 객체는 프리미티브 값을 초기화 값을 ㅗ받기 때문에 `state.foo` 와 동기화가 되지 않음

### toRef 활용

`toRef()` 는 Composable 함수에 Props 참조를 전달하려는 경우에 유용함

```javascript
import { toRef } from 'vue'
const props = defineProps(/*...*/)

// `props.foo` 를 ref 로 변환한 다음
useSomeFeature(toRef(props, 'foo'))
```

`toRef()` 가 `props` 와 함께 사용되면 `props` 변경에 대한 제한사항이 게속 적용 됨

ref 에 새 값을 할당하려는 시도는 props 를 직접 수정하는 것과 동일하게 판단되어 허용되지 않음

새 값을 할당하려는 상황이면 toRef() 대신 computed(get, set) 이 좀 더 활용하기 좋음

또한 toRef 는 반응형 객체의 속성이 존재하지 않아도 사용 가능한 ref 를 반환함

<br/>

## toRefs

반응형 객체를 구조분해 할당 후 반응형을 그대로 유지하고 싶을 때 사용함

반응형 객체를 구조분해 하여 재 할당 할 경우 반응형으로 동작하지 않음

(call by value 이므로)

```javascript
let position = reactive({
  x: 0,
  y: 0
})

let { x, y } = position
x++
y++
console.log(x, y) // 1 1
console.log(position.x, position.y) // 0 0
```

이 때, 반응형을 유지하기 위해 `reactive` 객체의 각각 속성을 `ref` 로 변환해 주는 것이 `toRefs` 임

`toRefs` 를 사용하면 `reactive` 객체의 각각의 속성이 `ref` 값으로 변환 됨

그렇기 때문에 구조분해 할당으로 재할당 하게 되면 재할당 받은 `ref` 참조 값 (x, y) 와 reactive 객체의 속성은 동기화가 됨

```javascript
let position = reactive({
  x: 0,
  y: 0
})

ley {x, y} = toRefs(position)
x.value++
y.value++
console.log(x.value, y.value) // 1 1
console.log(position.x, position.y) // 1 1
```

### toRefs 의 활용

`toRefs()` 는 일반 함수나 `Composable` 함수에서 `Reactive` 객체르 반환받는 경우에 유용

```javascript
function useFeature() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // .. logic operating on state

  // convert to refs when returning
  return toRefs(state)
}

// can destructure without losing reactivity
const { foo, bar } = useFeatureX()
```

Composable 함수에서 반환값을 `ref` 로 변환해야 하는 컨벤션이 존재함

하지만 Composable 함수 내부에서 reactive 객체를 사용하고 싶을 때는

`toRefs()` 함수를 사용하여 내부에서 사용한 `reactive` 객체를 반환시에 `ref` 로 변환 할 수 있음

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
