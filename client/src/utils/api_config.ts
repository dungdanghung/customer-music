import axios, { AxiosError, AxiosResponse } from 'axios'
import style from "../style/index.module.css"
import toast from '../helper/toast'


const devPorts = '3000'
let baseURL = ''
let baseIMG = ''
let baseICON = ''
if (devPorts === window.location.port) {
    baseURL = `${window.location.origin.replace(devPorts, '8000')}/api/`
    baseIMG = `${window.location.origin.replace(devPorts, '8000')}/`
    baseICON = `${window.location.origin.replace(devPorts, '3000')}/`
}
else {
    baseURL = `${window.location.origin}/api/`
    baseIMG = `${window.location.origin}/`
}
const ignoreLoaders = [
    '/user/info',
    '/comment',
    '/product/suggest',
    '/product/auto-complete'
]
function getToken() {
    const token = localStorage.getItem('token') || '' as string
    if (token) return JSON.parse(token)
    return false
}
function getTokenHeader() {
    return `Bearer ${getToken()}`
}
const request = axios.create({
    baseURL: baseURL
})
request.interceptors.request.use((config: any) => {
    if (config.method === 'get' && !ignoreLoaders.includes(config.url || '')) {
        config.onDownloadProgress = (progressEvent: any) => {
            // const loaderElement = document.querySelector<HTMLDivElement>('#loader')
            // if (progressEvent.progress && loaderElement) {
            //     const percent = 100 * progressEvent.progress
            //     if (percent !== 100) requestAnimationFrame(() => { loaderElement.style.width = `${percent}%` })
            //     else requestAnimationFrame(() => { loaderElement.style.width = '0%' })
            // }
        }
    } else if (config.method === 'post') {
        const loader = document.querySelector(`#loader`)
        loader?.classList.add(style['loading'])
    }

    if (getToken()) {
        config.headers.Authorization = getTokenHeader()
    }
    config.headers['Content-Type'] = 'multipart/form-data'
    return config
})

request.interceptors.response.use(
    function (response) {
        if (response.data) {
            if (response.data.msg && response.data.success === true && response.headers['content-type'] === 'application/json') {
                const loader = document.querySelector(`#loader`)
                if (loader) loader?.classList.remove(style['loading'])
                if (!response.request.responseURL.includes('getuser')) {
                    toast.success(response.data.msg)
                }
                return response
            } else if (response.data.msg && response.data.success === false && response.headers['content-type'] === 'application/json') {
                const loader = document.querySelector(`#loader`)
                if (loader) loader?.classList.remove(style['loading'])
                if (!response.request.responseURL.includes('getuser')) {
                    toast.error(response.data.msg)
                }
            }
        }
    },
    function (error: AxiosError) {
        const loader = document.querySelector(`#loader`)
        if (loader) loader?.classList.remove(style['loading'])
        if (error.message === 'Network Error') {
            toast.error(error.message)
            return Promise.reject(error)
        }
        const response = error.response as AxiosResponse
        if (response.data) {
            if (response.data.message && response.headers['content-type'] === 'application/json' && !response.request.responseURL.includes('getuser')) {
                toast.error(response.data.message)
            }
        }
        if (response.data.msg && response.data.success === 'fail' && response.headers['content-type'] === 'application/json') {
            toast.error(response.data.msg)
        }
        return Promise.reject(error)
    }
);
export {
    baseIMG,
    baseICON,
    getToken,
    getTokenHeader,
}
export default request