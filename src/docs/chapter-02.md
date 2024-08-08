## Computed

템플릿 문법 `{{}}` 을 사용하면 매우 편리하지만 템플릿 표현식 내 코드가 길어질 경우 가독성이 떨어지고 유지보수가 어려워짐

```vue
<script>
const teacher = reactive({
  name: "lee junmo",
  leactures: {
    "HTML/CSS",
    "JavaScript",
    "TypeScript",
    "React",
  }
})
</script>
```

이런 식이 있을 경우

```vue
<template>
  <p>강의가 존재합니까?</p>
  <span>{{ teacher.leactures.length > 0 ? 'Yes' : 'No' }}</span>
</template>
```

템플릿 표현식이 너무나도 길어 가독성이 떨어진다

따라서 이럴 때 사용하는 것이 `computed` (계산된 속성)

```vue
<script>
const hasLecture = computed(() => (teacher.lectures.length > 0 ? 'Yes' : 'No'))
</script>

<template>
  <p>강의가 존재 합니까?</p>
  <span>{{ hasLecture }}</span>
</template>
```

<br/>

### Computed vs Method

그럼 메서드와 계산된 속성은 뭐가 다를까?

아래와 같이 사용하면 `method` 도 `computed` 와 동일한 효과를 얻을 수 있다.

```vue
<script>
// in component
function existLecture() {
  return teacher.lectures.length > 0 ? 'Yes' : 'No'
}
</script>

<template>
  <p>{{ existLecture() }}</p>
</template>
```

이렇게 하면 동일한 결과를 얻을 수는 있지만 차이점이 존재한다.

`computed` 는 결과가 캐싱 된다는 것

또한 `computed` 에 사용 된 반응형 데이터가 변경된 경우에는 다시 계산이 됨

- `Computed` 는 캐싱 됨
- `Method` 는 파라미터가 올 수 있음
- 컴포넌트 랜더링 시 `computed` 는 비용이 적게 들음

<br/>

### Writable Computed

Computed 는 기본적으로 getter 전용. 계산된 속성에 새 값을 할당하려고 하면 런터임 경고가 표시

하지만 새로운 계산된 속성이 필요할 경우에 getter 와 setter 를 모두 제공하여 속성을 만들 수 있음

```vue
<script>
import { computed, ref } from 'vue'
export default {
  setup() {
    const firstName = ref('홍')
    const lastName = ref('길동')

    const fullName = computed({
      get() {
        return firstName.value + ' ' + lastName.value
      },
      set(newValue) {
        ;[firstName.value, lastName.value] = newValue.split(' ')
      }
    })

    fullName.value = '안녕 하세요'
    return {
      firstName,
      lastName,
      fullName
    }
  }
}
</script>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
