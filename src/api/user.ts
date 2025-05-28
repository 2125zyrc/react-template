import { http } from '@/utils/api'

export function getList() {
  return http.get('https://uapis.cn/api/myip.php1')
}
