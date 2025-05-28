import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  QueryClient,
} from '@tanstack/react-query'
import { http, RequestOptions } from '../utils/api'

// 通用响应类型
interface ApiResponse<T> {
  data: T
  code: number
  message: string
}

// 通用错误类型
interface ApiError {
  status: number
  statusText: string
  response?: any
}

// 查询参数类型
interface QueryParams {
  [key: string]: any
}

// 创建 useApi hook
export function useApi<T = any>(endpoint: string) {
  // GET 请求 hook
  const useGet = (
    params?: QueryParams,
    options?: Omit<UseQueryOptions<ApiResponse<T>, ApiError>, 'queryKey' | 'queryFn'>,
    config?: Omit<RequestOptions, 'params'>,
  ) => {
    console.log('useApi params:', params)
    return useQuery<ApiResponse<T>, ApiError>({
      queryKey: [endpoint, params],
      queryFn: () => {
        console.log('useApi queryFn params:', params)
        return http.get<ApiResponse<T>>(endpoint, {
          ...config,
          params,
        })
      },
      ...options,
    })
  }

  // POST 请求 hook
  const usePost = <D = any>(
    options?: Omit<UseMutationOptions<ApiResponse<T>, ApiError, D>, 'mutationFn'>,
    config?: Omit<RequestOptions, 'params'>,
  ) => {
    return useMutation<ApiResponse<T>, ApiError, D>({
      mutationFn: (data) => http.post<ApiResponse<T>>(endpoint, data, config),
      ...options,
    })
  }

  // PUT 请求 hook
  const usePut = <D = any>(
    options?: Omit<UseMutationOptions<ApiResponse<T>, ApiError, D>, 'mutationFn'>,
    config?: Omit<RequestOptions, 'params'>,
  ) => {
    return useMutation<ApiResponse<T>, ApiError, D>({
      mutationFn: (data) => http.put<ApiResponse<T>>(endpoint, data, config),
      ...options,
    })
  }

  // PATCH 请求 hook
  const usePatch = <D = any>(
    options?: Omit<UseMutationOptions<ApiResponse<T>, ApiError, D>, 'mutationFn'>,
    config?: Omit<RequestOptions, 'params'>,
  ) => {
    return useMutation<ApiResponse<T>, ApiError, D>({
      mutationFn: (data) => http.patch<ApiResponse<T>>(endpoint, data, config),
      ...options,
    })
  }

  // DELETE 请求 hook
  const useDelete = (
    options?: Omit<UseMutationOptions<ApiResponse<T>, ApiError, void>, 'mutationFn'>,
    config?: Omit<RequestOptions, 'params'>,
  ) => {
    return useMutation<ApiResponse<T>, ApiError>({
      mutationFn: () => http.delete<ApiResponse<T>>(endpoint, config),
      ...options,
    })
  }

  return {
    useGet,
    usePost,
    usePut,
    usePatch,
    useDelete,
  }
}

// 创建并导出 queryClient 实例
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000, // 替换 cacheTime
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})
