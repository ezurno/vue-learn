import axios from 'axios'
import { ref, unref, watchEffect } from 'vue'

axios.defaults.baseURL = `http://localhost:5000/`

const defaultConfig = {
  method: 'get'
}

export const useAxios = (url, config = {}) => {
  const response = ref(null)
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const { params } = config

  const execute = () => {
    data.value = null
    error.value = null
    loading.value = true
    axios(url, {
      ...defaultConfig,
      ...config,
      params: unref(params)
    })
      .then((res) => {
        // response.value = res
        response.value = res.headers['x-total-count']
        data.value = res.data
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  watchEffect(execute)

  console.log(response)
  return {
    response,
    data,
    error,
    loading
  }
}
