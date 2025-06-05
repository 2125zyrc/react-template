import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
  QueryClient,
  useQueryClient,
  QueryKey,
} from '@tanstack/react-query'
import { http, RequestOptions, ApiError } from '@/utils/request'

// 通用响应类型
export interface ApiResponse<T = any> {
  data: T
  code: number
  message: string
}

// 查询参数类型
export type QueryParams = Record<string, any>

// 请求配置类型
export interface RequestConfig extends Omit<RequestOptions, 'method' | 'data'> {
  invalidateQueries?: QueryKey[]
}

// 创建 useApi hook
export function createApi<T = any>(endpoint: string) {
  // GET 请求 hook
  const useGet = <R = T>(
    params?: QueryParams,
    options?: Omit<UseQueryOptions<ApiResponse<R>, ApiError>, 'queryKey' | 'queryFn'>,
    config?: RequestConfig,
  ) => {
    return useQuery<ApiResponse<R>, ApiError>({
      queryKey: [endpoint, params],
      queryFn: async () => {
        try {
          return await http.get<ApiResponse<R>>(endpoint, {
            ...config,
            params,
          })
        } catch (error) {
          if (error instanceof ApiError) {
            throw error
          }
          throw new ApiError(500, 'Unknown error occurred')
        }
      },
      ...options,
    })
  }

  // POST 请求 hook
  const usePost = <D = any, R = T>(
    options?: Omit<UseMutationOptions<ApiResponse<R>, ApiError, D>, 'mutationFn'>,
    config?: RequestConfig,
  ) => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<R>, ApiError, D>({
      mutationFn: async (data) => {
        try {
          const response = await http.post<ApiResponse<R>>(endpoint, data, config)
          // 自动使相关查询失效
          if (config?.invalidateQueries) {
            config.invalidateQueries.forEach((queryKey) => {
              queryClient.invalidateQueries({ queryKey })
            })
          }
          return response
        } catch (error) {
          if (error instanceof ApiError) {
            throw error
          }
          throw new ApiError(500, 'Unknown error occurred')
        }
      },
      ...options,
    })
  }

  // PUT 请求 hook
  const usePut = <D = any, R = T>(
    options?: Omit<UseMutationOptions<ApiResponse<R>, ApiError, D>, 'mutationFn'>,
    config?: RequestConfig,
  ) => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<R>, ApiError, D>({
      mutationFn: async (data) => {
        try {
          const response = await http.put<ApiResponse<R>>(endpoint, data, config)
          if (config?.invalidateQueries) {
            config.invalidateQueries.forEach((queryKey) => {
              queryClient.invalidateQueries({ queryKey })
            })
          }
          return response
        } catch (error) {
          if (error instanceof ApiError) {
            throw error
          }
          throw new ApiError(500, 'Unknown error occurred')
        }
      },
      ...options,
    })
  }

  // PATCH 请求 hook
  const usePatch = <D = any, R = T>(
    options?: Omit<UseMutationOptions<ApiResponse<R>, ApiError, D>, 'mutationFn'>,
    config?: RequestConfig,
  ) => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<R>, ApiError, D>({
      mutationFn: async (data) => {
        try {
          const response = await http.patch<ApiResponse<R>>(endpoint, data, config)
          if (config?.invalidateQueries) {
            config.invalidateQueries.forEach((queryKey) => {
              queryClient.invalidateQueries({ queryKey })
            })
          }
          return response
        } catch (error) {
          if (error instanceof ApiError) {
            throw error
          }
          throw new ApiError(500, 'Unknown error occurred')
        }
      },
      ...options,
    })
  }

  // DELETE 请求 hook
  const useDelete = <R = T>(
    options?: Omit<UseMutationOptions<ApiResponse<R>, ApiError, void>, 'mutationFn'>,
    config?: RequestConfig,
  ) => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<R>, ApiError>({
      mutationFn: async () => {
        try {
          const response = await http.delete<ApiResponse<R>>(endpoint, config)
          if (config?.invalidateQueries) {
            config.invalidateQueries.forEach((queryKey) => {
              queryClient.invalidateQueries({ queryKey })
            })
          }
          return response
        } catch (error) {
          if (error instanceof ApiError) {
            throw error
          }
          throw new ApiError(500, 'Unknown error occurred')
        }
      },
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
export const queryClient = new QueryClient()
