import axios from 'axios'

const API_URL = process.env.API_URL || 'http://www.camera-stream.tk:3000/v1/app'

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})
