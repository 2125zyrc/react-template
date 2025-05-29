import { http } from '@/utils/api'

interface PageParams {
  page: number
  limit: number
}

export function getList(params?: PageParams) {
  return http.get('https://uapis.cn/api/myip.php1', { params })
}
