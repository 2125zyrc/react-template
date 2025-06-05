// 类型定义
export interface RequestOptions {
  method: string
  headers?: HeadersInit
  token?: string
  data?: any
  responseType?: 'json' | 'blob' | 'text'
  params?: Record<string, any>
}

// 业务响应格式
export interface BusinessResponse<T = any> {
  code: number
  message: string
  data: T
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response?: any,
  ) {
    super(`${status} ${statusText}`)
    this.message = `${status} ${statusText}`
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}

// 从环境变量获取配置
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
const PREFIX_PATH = import.meta.env.VITE_API_PREFIX_PATH || ''
console.log('xxxx', import.meta.env)

// 处理查询参数
const buildUrl = (endpoint: string, params?: Record<string, any>): string => {
  if (!params) return endpoint

  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value))
    }
  })

  return `${endpoint}?${searchParams.toString()}`
}

// 基础请求函数
async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers)

  // 设置 Content-Type
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  // 添加认证 Token
  const accesstoken = options.token || localStorage.getItem('accesstoken')
  if (accesstoken) {
    headers.set('accesstoken', accesstoken)
  }
  // 处理请求体
  let body = null
  if (!['GET'].includes(options.method)) {
    body = options.data ? JSON.stringify(options.data) : '{}'
  }

  // 构建完整 URL
  const url = buildUrl(`${BASE_URL}${PREFIX_PATH}${endpoint}`, options.params)
  console.log('API request URL:', url)

  const response = await fetch(url, {
    method: options.method,
    headers,
    body,
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      errorData = (await response?.statusText) || ''
    }
    throw new ApiError(response.status, response.statusText, errorData)
  }

  // 处理空响应
  if (response.status === 204) {
    return null as T
  }

  // 根据 responseType 处理不同响应类型
  switch (options.responseType) {
    case 'blob':
      return response.blob() as Promise<T>
    case 'text':
      return response.text() as Promise<T>
    default: {
      const data = await response.json()
      // 处理业务层面的错误码
      if (data && typeof data.code !== 'undefined') {
        if (data.code === 500) {
          throw new ApiError(data.code, data.message || '业务处理失败', data)
        } else if (data.code === 401) {
          window.location.href = '/error'
        }
        return data as T
      }
      return data as T
    }
  }
}

// 封装 HTTP 方法
export const http = {
  get: <T = any>(
    endpoint: string,
    params: any,
    options?: Omit<RequestOptions, 'method' | 'data' | 'params'>,
  ) => request<T>(endpoint, { ...options, method: 'GET', params }),

  post: <T = any>(
    endpoint: string,
    data: any,
    options?: Omit<RequestOptions, 'method' | 'data' | 'params'>,
  ) => request<T>(endpoint, { ...options, method: 'POST', data }),

  put: <T = any>(
    endpoint: string,
    data: any,
    options?: Omit<RequestOptions, 'method' | 'data' | 'params'>,
  ) => request<T>(endpoint, { ...options, method: 'PUT', data }),

  patch: <T = any>(
    endpoint: string,
    data: any,
    options?: Omit<RequestOptions, 'method' | 'data' | 'params'>,
  ) => request<T>(endpoint, { ...options, method: 'PATCH', data }),

  delete: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}
