import axios from 'axios'

// Backend API base URL (change if needed)
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE
})

// Set Authorization header when logging in
export function setAuth(token) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

// If token is already saved, auto-load into axios
const savedToken = localStorage.getItem('token')
if (savedToken) {
  setAuth(savedToken)
}

// THIS IS IMPORTANT
// We export the axios instance as default
export default api
