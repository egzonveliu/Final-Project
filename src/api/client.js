import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 8000,
})

// Fetch public posts to show as "blog/activity" on dashboard
export const fetchPosts = async () => {
  const { data } = await api.get('/posts?_limit=6')
  return data
}

// Fetch GitHub-style user info (mocked via JSONPlaceholder)
export const fetchUserActivity = async () => {
  const { data } = await api.get('/todos?_limit=10')
  return data
}

// Contact form submission (mocked)
export const submitContact = async (formData) => {
  const { data } = await api.post('/posts', {
    title: formData.subject,
    body: formData.message,
    userId: 1,
  })
  return data
}

export default api
