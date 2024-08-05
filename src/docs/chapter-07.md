## 양방향 바인딩

### v-model

프론트앤드에서 입력 양식을 처리할 때 **입력 요소의 상태** 와 **자바스크립트의 상태를 동기화** 해야 하는 경우가 많음

`value` 를 바인딩 하고 `@input` 이벤트로 `text` 를 변경하는 것은 번거로움

```vue
<template>
  <input :value="text" @input="(event) => (text = event.target.value)" />
</template>
```

> vue 에서는 이러한 작업을 단순화 하도록 양쪽 방향을 바인딩할 수 있는 `v-model` 디렉티브를 제공

```vue
<template>
  <input v-model="text" />
</template>
```

### v-model 수식어

- .lazy

기본적으로 `v-model` 은 각 `input` 이벤트 후 입력과 데이터를 동기화 함

`lazy` 수식어를 추가하여 `change` 이벤트 이후에 동기화 할 수 있음

```vue
<template>
  <input v-model.lazy="text/>
</template>
```

- .number

사용자 입력이 자동으로 number 타입으로 형 변환

```vue
<template>
  <input v-model.number="text" />
</template>
```

- .trim

사용자가 입력한 값에서 자동으로 앞 뒤 공백을 제거하는 trim

```vue
<template>
  <input v-model.trim="text" />
</template>
```
