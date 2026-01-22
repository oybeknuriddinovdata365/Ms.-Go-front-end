import axios from "axios"
import { refreshToken } from "./auth"

const api = axios.create({
  baseURL: "http://164.92.104.205:3000/api",
})

api.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("accessToken")

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

api.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const data = await refreshToken()

        localStorage.setItem("accessToken", data.accessToken)
        localStorage.setItem("refreshToken", data.refreshToken)

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`

        return api(originalRequest)
      } catch (err) {
        localStorage.clear()
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default api;