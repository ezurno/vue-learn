import axios from 'axios'
import { isRef, ref, unref, watchEffect } from 'vue'

axios.defaults.baseURL = `http://localhost:5000/`

const defaultConfig = {
  method: 'get'
}

const defaultOptions = {
  immediate: true
}

export const useAxios = (url, config = {}, options = {}) => {
  const response = ref(null)
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const { params } = config
  const { onSuccess, onError, immediate } = { ...defaultOptions, ...options }

  const execute = (body) => {
    data.value = null
    error.value = null
    loading.value = true
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params),
      data: typeof body === 'object' ? body : {}
    })
      .then((res) => {
        // response.value = res
        response.value = res.headers['x-total-count']
        data.value = res.data
        if (onSuccess) {
          onSuccess(res)
        }
      })
      .catch((err) => {
        error.value = err
        if (onError) {
          onError(err)
        }
      })
      .finally(() => {
        loading.value = false
      })
  }

  /**
   * 일반적으로 컴포지블 함수를 사용할 때 다른 개발자도 함께 사용한다
   * 따라서 컴포지블 함수를 사용할 때 넘기는 방식이 반응형으로 넘기는지, object 로 넘기는지에 따라
   * 달라질 수 있다. 따라서 두가지를 다 대응해야 한다.
   */
  if (isRef(params)) {
    watchEffect(execute)
  } else {
    if (immediate) {
      execute()
    }
  }

  return {
    response,
    data,
    error,
    loading,
    execute
  }
}
