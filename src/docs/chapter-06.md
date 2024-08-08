## 이벤트 처리

이벤트 처리는 `v-on` 디렉티브로 사용할 수 있음

자주 사용하기 때문에 `@` 이라는 단축 표현으로 많이 사용함

```vue
<script>
const counter = ref(0)
</script>

<template>
  <div>
    <button @click="counter += 1">counter {{ counter }}</button>
  </div>
</template>
```

### 메소드 이벤트 핸들러

`v-on` 디렉티브에서 메소드를 호출 할 수 있음

그러고 이때 매개변수로 `event` 객체를 받음

```vue
<script>
const printEventInfo = (event) => {
  console.log(event.target)
  console.log(event.target.tagName)
}
</script>

<template>
  <div>
    <button @click="printEventInfo">printEventInfo</button>
  </div>
</template>
```

### 이벤트 객체 접근

인라인 핸들링에서 `event` 객체에 접근할 수 있음

접근하는 방법은 `$event` 를 사용하여 사용

```vue
<script>
const printEventInfo2 = (message, event) => {
  console.log('message : ', message)
  console.log(event.target)
  console.log(event.target.tagName)
}
</script>

<template>
  <button @click="printEventInfo2('hello world', $event)">inline event handler</button>
</template>
```

<br/>

### 이벤트 수식어 (Modifiers)

우리는 이벤트를 조작할 때 이벤트 내부에서 `event.preventDefault()` 또는 `event.stopPropagation()`
;

를 호출 할 수 있음

메소드에서 이러한 메소드의 호출은 어렵지 않지만 메소드 안에서 비즈니스 외 이러한 코드는 비효율적

이러한 문제를 해결하기 위해 `v-on` 이벤트에 다양한 이벤트 수식어가 제공 됨

- `.stop` : `event.stopPropagation()`
- `.prevent` : `event.preventDefault()`
- `.capture` : 캡쳐모드를 사용할 때 이벤트 리스너를 사용 가능
- `.self` : 오로지 자기 자신만 호출 할 수있음 (target 요소가 self 일 때)
- `.once` : 해당 이벤트는 한번만 실행
- `.passive` : 일반적으로 모바일 장치 성능을 개선하기 위해 터치 이벤트 리스너와 함께 사용

```vue
<template>
  <!-- 클릭 이벤트 전파가 중단되었습니다. -->
  <a @click.stop="doThis"></a>

  <!-- 제출 이벤트가 페이지를 다시 로드하지 않습니다. -->
  <form @submit.prevent="onSubmit"></form>

  <!-- 수정자는 체이닝이 가능합니다. -->
  <a @click.stop.prevent="doThat"></a>

  <!-- 단순히 수식어만 사용이 가능합니다. -->
  <form @submit.prevent></form>

  <!-- 캡처 모드를 사용할 때 이벤트 리스너를 사용 가능합니다.-->
  <!--즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
  <div @click.capture="doThis">...</div>

  <!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다.-->
  <!-- 자식 엘리먼트에서는 처리되지 않습니다.-->
  <div @click.self="doThat">...</div>

  <div @scroll.passive="onScroll">...</div>
</template>
```

<br/>

### 키 수식어

키보드 이벤트를 수신할 때 종종 특정 키를 확인해야 하는 경우가 있음

> vue 에서는 `v-on` 또는 `@` 디랙티브에 키 수식어를 제공

- `.enter`
- `.tab`
- `.delete` (DELETE, BACKSPACE 둘 다 수신)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

```vue
<template>
  <input type="text" @keyup.enter="addTodo" />
</template>
```

<br/>

### 시스템 키 수식어

다음 수식어를 사용해 해당 수식어 키가 눌러진 경우에만 마우스 또는 키보드 이벤트 리스너를 트리거 할 수 있음

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` (MAC 에서의 meta 는 command key, Window 에서의 meta 는 window key)

```vue
<template>
  <!-- 알트 + 엔터 -->
  <input @keyup.alt.enter="clear" />

  <!-- 컨트롤 + 엔터 -->
  <input @keyup.ctrl.enter="send" />

  <!-- 컨트롤 + 클릭 -->
  <div @click.ctrl="doSomething">Do something</div>
</template>
```

<br/>

### .exact 수식어

> .exact 수식어는 정확한 조합이 눌러야 하는 것을 요구 함

```vue
<template>
  <div>
    <!-- 아래코드는 Alt 또는 Shift와 함께 눌렀을 때도 실행됩니다.-->
    <button @click.ctrl="onClick">A</button>

    <!-- 아래코드는 Ctrl키만 눌려져 있을 때 실행됩니다.-->
    <button @click.ctrl.exact="onCtrlClick">A</button>

    <!-- 아래 코드는 시스템 키가 눌리지 않은 상태인 경우에만 작동합니다.-->
    <button @click.exact="onClick">A</button>
  </div>
</template>
```

<br/>

### 마우스 버튼 수식어

- `.left`
- `.right`
- `.middle`

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
