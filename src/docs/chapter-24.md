## Plugins

### 플러그인 이란?

> 플러그인(Plugin) 은 일반적으로 Vue 에 전역 수준의 기능을 추가할 때 사용하는 기능

플러그인에 대해 엄격하게 정의된 범위는 존재하지 않지만 일반적으로 플러그인이 유용한 시나리오는 다음과 같음

- `app.component()` 메서드를 사용하여 전역 컴포넌트를 등록하고자 할 때
- `app.directive()` 메서드를 사용하여 커스텀 디렉티브를 등록하고자 할 때
- `app.provide()` 를 사용하여 앱 전체에 리소스(메서드 도는 데이터)를 주입할 때
- 전역 애플리케이션 인스턴스에 속성 또는 메서드를 추가하고자 할 때 `app.config.globalProperties` 에 연결하여 추가할 수 있음
- 위의 몇 가지 조합을 수행하는 라이브러리를 설치하고자 할 때

<br/>

### 플러그인 작성하기

> 플러그인은 _install() 메서드를 갖고 있는 객체_ 나 단순히 _설치함수_ 로 만들 수 있음

```javascript
// install() 메서드를 갖고 있는 객체
const objPlugin = {
  install(app, options) {}
}

// 단순 설치함수
function funcPlugin(app, options) {}
```

그리고 작성한 플러그인을 전역 수준의 기능으로 추가할 때는 `app.use()` 메서드를 사용할 수 있음

```javascript
import { createApp } from 'vue';
import router from '@/router';
import { funcPlugin } from './plugins/func';
import { objPlugin } from './plugins/obj';

const app = createApp(App);
app.use(router);
app.use(funcPlugin, { // options });
app.use(objPlugin, { // options });
app.mount('#app');
```

`app.use()` 메소드로 플러그인을 설치하면 플러그인의 매개변수로 `app instance` 와 `options` 이 전달 됨

```javascript
const objPlugin = {
  install: (app, options) => {
    // app.provide, app.component 등 사용할 수 있는 전역 인스턴스
    // app.use(plugin, { options }) 호출 시 전달한 두 번째 파라미터
  }
}
```

<br/>

### Vue 3 Global Component Type Checking Issue

#### components.d.ts 등록

- vite-plugin-components 옵션을 사용하여 한번에 체크 가능
  - `ViteComponents()` : 자동 import
  - `globalComponentsDeclaration : true` 옵션 components.d.ts 자동 등록

<br/>

#### Vue 3 Support - All in One

- Vue 3 Support - All in One 플러그인 사용

<br/>

[<< 이전 페이지로 돌아가기](../../README.md)
