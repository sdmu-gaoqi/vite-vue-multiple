import { env } from '@/constant'
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { cookie } from 'wa-utils'

const _request = axios.create({
  baseURL: env.VITE_BASE_REQUEST,
  timeout: 150000,
  withCredentials: true
})

class Request {
  public commonData: any = {}
  constructor() {
    _request.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${cookie.get('Admin-Token')}`
      request.headers['Content-Type'] = `application/json`
      request.params = {
        ...(request.params || {})
      }
      return request
    })

    _request.interceptors.response.use(
      // @ts-ignore
      // eslint-disable-next-line
      (res: any) => {
        if (!res.code) {
          return Promise.resolve(res)
        }
        return Promise.reject(res)
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  }

  request = async <T>(data: AxiosRequestConfig<any>) => {
    try {
      const res = await _request.request(data)
      return res.data as T
    } catch (err: any) {
      return Promise.reject(err)
    }
  }

  upDateCommonData = (data: any) => {
    this.commonData = {
      ...this.commonData,
      ...data
    }
  }
}

const request = new Request()

export default request
