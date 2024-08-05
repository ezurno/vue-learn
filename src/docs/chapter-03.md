## 클래스와 스타일 바인딩

### HTML 클래스 바인딩

#### 객체 바인딩

클래스를 동적으로 바인딩 하기 위해서는 `:class` 를 사용할 수 있음

```vue
<template>
  <div class="text" :class="{ active: isActive, 'text-danger': hasError }"></div>
</template>
```

#### 배열 바인딩

배열에 `:class` 를 바인딩 하여 클래스 목록을 적용할 수 있음

```vue
<script>
const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>

<template>
  <div :class="[activeClass, errorClass]"></div>
</template>
```

### 인라인 스타일 바인딩

HTML style 속성에 객체 값을 바인딩 할 수 있음

```vue
<script>
const activeColor = ref('red')
const fontSize = ref(30)
</script>

<template>
<div :style="{color: activeColor, fontSize: fontSize + `px`}">
</template>
```

템플릿이 더 깔끔해지도록 스타일 객체에 직접 바인딩 하는 것이 좋음

```vue
<script>
const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
</script>

<template>
  <div :style="styleObject"></div>
</template>
```

#### 배열 바인딩

`:style` 은 여러 객체 배열에 바인딩 할 수 있음

```vue
<template>
  <div :style="[baseStyles, overridingStyles]"></div>
</template>
```
