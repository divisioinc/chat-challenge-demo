import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: ''
})

const api = {
  get: url => axiosInstance.get(url),
  post: (url, data, config) => axiosInstance.post(url, data, config)
}

export default api
