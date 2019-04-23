import axios from 'axios'

const config = {
  baseURL: '',
  withCredentials: false,
  responseType: 'json',

  transformResponse: [(data) => data],
  maxRedirects: 5, // default
  maxContentLength: 50,
  validateStatus: (status) => {
    return status >= 200 && status < 500 // default
  },
  xsrfCookieName: 'XSRF-TOKEN', // default
  xsrfHeaderName: 'X-XSRF-TOKEN', // default
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 0
}

const apiInstance = axios.create(config)



function get (apiURL, options = {}) {
  return (
    apiInstance.get(apiURL, options).then(response => {
      return handleResponse(response)
    }).catch(error => {
      return handleError(error)
    })
  )
}

function handleResponse (response) {
  let resData = {}
  if (typeof response.data === 'object') {
    if (response.status === 404) {
      resData = { status: 'failure', statusCode: 404, message: response.statusText }
    } else {
      resData = response.data
    }
  } else {
    resData = JSON.parse(response.data)
  }
  return resData
}

function handleError (error) {
  if (error.message === 'Network Error') {
    return { status: 'failure', statusCode: 500, message: error.message }
  } else if (error.message && !error.status) {
    return { status: 'failure', statusCode: 503, message: error.message }
  } else if (error.response.data) {
    return error.response.data
  } else if (error.response) {
    return { status: 'failure', statusCode: error.response.status, message: error.message }
  } else if (error.request) {
    return { status: 'failure', statusCode: error.status, message: error.message }
  } else {
    return { status: 'failure', statusCode: error.status, message: error.message }
  }
}

export default {
  get
}

// https://github.com/BootstrapDash/StarAdmin-Free-Bootstrap-Admin-Template.git