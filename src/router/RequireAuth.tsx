import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { navigateTo } from './RouteUtils'

// 定义白名单路由类型
type WhiteList = string[]

// 定义组件props类型
interface RouteProps {
  children: ReactNode
}

// 默认白名单路由
const DEFAULT_WHITE_LIST: WhiteList = ['/', '/about', '/login']

/**
 * 增强版路由守卫组件
 * @param children 要渲染的子组件
 * @param whiteList 自定义白名单，可选
 */
const RequireAuth: React.FC<RouteProps> = ({ children }) => {
  const location = useLocation()
  // const isAuthenticated = !!localStorage.getItem('token')
  const isAuthenticated = true

  // 检查当前路径是否在白名单中
  const isInWhiteList = DEFAULT_WHITE_LIST.includes(location.pathname)
  console.log('isInWhiteList', isInWhiteList)
  console.log('isAuthenticated', isAuthenticated)
  console.log('location.pathname', location.pathname)
  // 如果在白名单中，直接放行
  if (isInWhiteList) {
    return <>{children}</>
  }

  // 不在白名单且未登录，重定向到登录页
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
  return <>{children}</>
}

export default RequireAuth
