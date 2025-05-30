import { http } from '@/utils/request'

interface PageParams {
  page: number
  limit: number
}

export function getList(data?: PageParams) {
  return http.get('https://uapis.cn/api/myip.php1', { data })
}
