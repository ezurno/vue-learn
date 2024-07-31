// object 형식
const objPlugins = {
  install(app, options) {
    console.log('OBJECT PLUGIN >>>', app)
    console.log(`OBJECT PLUGIN OPTION >>>`, options)
  }
  // app.compoent() 전역 컴포넌트
  // app.config.globalProperties 전역 애플리케이션 인스턴스에 속성 추가
  // app.directive 커스텀 directive
  // app.provide 리소스
}

export default objPlugins
