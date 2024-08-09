## isRef, unref, isProxy, isReactive, isReadonly

### isRef()

값이 ref 인지 확인

```vue
<script>
if (isRef(foo)) {
  foo.value
}
</script>
```

<br/>

### unref()

매개변수가 Ref 이면 내부 값(`.value`) 를 반환하고 아니면 매개변수 자체를 반환

이것은 다음 표현식에 대해 `syntactic sugar` 임 `val = isRef(val) ? val.value : val`

```vue
<script>
function useFoo(x) {
  const unwrapped = unref(x)
}
</script>
```

<br/>

### isReactive()

객체가 `reactive()` 또는 `shallowReactive()` 에 의해 생성된 프록시인지 확인함

```vue
<script>
const person = reactive({...})
isReactive(person)
</script>
```

<br/>

### isReadonly()

객체가 `readonly()` 또는 `shallowReadonly()` 에 의해 생성된 프록시인지 확인함

```vue
<script>
const option = readonly({...})
isReadonly(option)
</script>
```

<br/>

### isProxy()

객체가 `reactive()`, `shallowReactive()`, `readonly()`, `shallowReadonly()` 에 의해 생성된 프록시인지 확인 함

```vue
<script>
isProxy(person)
isProxy(option)
</script>
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
