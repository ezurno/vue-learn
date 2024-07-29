### History Mode

> vue 에서는 `router` 인스턴스를 생성할 때 `history` 옵션으로 다양한 history-mode 중 에서 선택이 가능함

기본적으로 알고 있는 router-mode

1. 페이지를 요청 할 때 각 url 에 일치하는 파일 위치에 index 파일이 랜더링 됨
2. 각 페이지 마다 request-url 이 따로 존재함
3. SEO 에 최적화

- Hash - `createWebHashHistory()`
- History - `createWebHistory()`
- Memory - `createMemoryHistory()`

```javascript
const router = createRouter({
  history: createWebHistory(),
  routes
})
```

### Hash Mode

> Vue Router 을 통해 URL 로 페이지를 전환 할 때 히스토리 관련 기법으로 # (해시) 형으로 쓸 수 있게 해줌

`createWebHashHistory()` 를 통해 사용이 가능

1. 해시모드에서는 # 뒤로는 요청하지 않는다.
2. ex) `localhost:3000/#/nested/two` => `localhost:3000` 가 request-url 임
3. 웹에서 url 로 접근 할 때에는 해당 route 에 일치하는 값이 index 파일로 존재해야 정상적으로 배포가 가능함
4. hash mode 에서는 요청 자체를 localhost:3000 에 하기 때문에 index 를 각각 만들지 않아도 배포가 가능
5. SEO 가 잘 되지 않는 치명적인 단점이 존재함

```javascript
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
```

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
