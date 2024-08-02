### Composable 이란?

> Vue 애플리케이션에서 `Composable` 은 Vue Composition API 를 활용하여 상태 저장 비즈니스 로직을 캡슐화 하고 재사용하는 기능

프론트앤드 애플리케이션으 구축 할 시 일반적인 로직을 재사용해야 하는 경우가 생김

ex) 여러곳에서 날짜 형식을 지정해야 할 때

이러한 로직을 사용하기 위해서 함수(module) 로 추출을 하는데, 이러한 함수는 `상태 비저장 로직을 캡슐화` 한 것.

따라서 간단한 Input / Output 만 있는 구조

이러한 상태 비저장 로직을 재사용하기 위한 많은 라이브러리가 존재

`lodash`, `dayjs`

하지만 상태 저장 로직은 사용하면서 변경되는 상태관리가 포함

<br/>

#### Naming Rule

Composable gkatnsms `use` 로 시작하는 `camelCase` 로 시작하는 이름을 지정하는 것이 규칙

#### Input Arguments

Composable 함수는 반응성에 의존하지 않더라도 ref 파라미터를 입력값으로 받을 수 있음

그렇기 때문에 다른 개발자와 함께 사용하는 Composable 함수를 개발하는 경우 입력 파라미터가 ref 인 경우를 처리를 하는 것이 좋음

따라서 Utilities Function 인 `unref()` 를 사용하면 유용함

```javascript
import { unref } from 'vue'

function useFeature(maybeRef) {
  // 만약 mayRef 가 실제로 Ref 라면, 그것의 .value 가 반환
  // 그렇지 않으면, mayRef 는 있는 그대로 반환 됩니다.
  const value = unref(maybeRef)
}
```

#### Return Values

Composable 함수에서 `reactive()` 대신 `ref()` 를 독점적으로 사용하고 있음

Vue 에서 권장되는 컴벤션은 컴포넌트에서 구조분해 할당으로 재할당 받을 수 있도록 Composable 함수에서 ref 객체를 반환 하는 것임

```javascript
const { x, y } = useMouse()
```

Composable 에서 `reactive` 객체를 반환하면 구조분해 할당시 내부 상태에 대한 반응성 연결이 끊어지고

`ref` 로 반환하면 해당 연결이 유지 됨

따라서 Composable 에서 반환 된 상태를 객체 속성으로 사용하려는 경우 반환된 객체를 reactive 랩핑 함

```javascript
const mouse = reactive(useMouse())
// mouse.x 는 원본 참조에 연결되어 있습니다.
console.log(mouse.x)
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
