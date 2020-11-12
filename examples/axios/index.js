import axios from 'axios'

//设置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
//请求前拦截
axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
//请求返回拦截
axios.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            return response.data
        }
    },
    error => {
        if (error.response) {
            if (error.response.status === 400) {

            } else if (error.response.status === 404) {

            } else if (error.response.status === 500) {

            }
        }
        return error.response.data
    }
)

export {axios}