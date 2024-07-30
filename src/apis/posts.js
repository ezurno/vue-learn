import { postsInstance } from '.'

export function getPosts(params) {
  return postsInstance.get('/', { params })
}

export function getPostById(id) {
  return postsInstance.get(`/${id}`)
}

export function createPost(data) {
  return postsInstance.post('', data)
}

export function updatePost(id, data) {
  return postsInstance.put(`/${id}`, data)
}

export function deletePost(id) {
  return postsInstance.delete(`/${id}`)
}
