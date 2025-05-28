// 类型定义
export interface RequestOptions {
  method?: string
  headers?: HeadersInit
  token?: string
  data?: any
  responseType?: 'json' | 'blob' | 'text'
  params?: Record<string, any>
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
const BASE_URL = import.meta.env.VITE_API_BASE_URL
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
  // Add artificial delay for testing
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  const headers = new Headers(options.headers)

  // 设置 Content-Type
  if (!headers.has('Content-Type') && options.data) {
    headers.set('Content-Type', 'application/json')
  }

  // 添加认证 Token
  const token = options.token || localStorage.getItem('token')
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  // 处理请求体
  let body: BodyInit | null = null
  if (options.data) {
    body = JSON.stringify(options.data)
  }

  // 构建完整 URL
  const url = buildUrl(`https://uapis.cn/api/myip.php/${endpoint}`, options.params)
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
      errorData = await response.text()
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
    default:
      return response.json()
  }
}

// 封装 HTTP 方法
export const http = {
  get: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'data'>) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(
    endpoint: string,
    data: any,
    options?: Omit<RequestOptions, 'method'>,
  ) => request<T>(endpoint, { ...options, method: 'POST', data }),

  put: <T = any>(endpoint: string, data: any, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'PUT', data }),

  patch: <T = any>(
    endpoint: string,
    data: any,
    options?: Omit<RequestOptions, 'method'>,
  ) => request<T>(endpoint, { ...options, method: 'PATCH', data }),

  delete: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
}
