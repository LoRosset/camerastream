import axios from 'axios'
const https = require('https')

const API_URL = process.env.API_URL || 'https://camera-stream.tk:3000/v1/app'
var agent = new https.Agent({
  rejectUnauthorized: false
})

export default axios.create({
  baseURL: API_URL,
  httpsAgent: agent,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.token
  }
})
