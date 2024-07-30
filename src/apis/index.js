import axios from 'axios'

function createInstance(baseURL, options) {
  const instance = axios.create(Object.assign({ baseURL }, options))
  return instance
}

export const postsInstance = createInstance('http://localhost:5000/posts/')
