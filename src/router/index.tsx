import { useRoutes } from 'react-router-dom'
import RouteTree from './RouteTree'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Test from '../pages/Test'
import NotFound from '../pages/NotFound'
import Layout1 from '../layout/Layout1'
import RequireAuth from './RequireAuth'
import DeviceList from '../pages/DeviceList/Index'
import SsoLogin from '@/pages/SsoLogin/Index'
import Error from '@/pages/Error/Index'

import type { RouteObject } from 'react-router-dom'

// 路由配置
const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/device-list', element: <DeviceList /> },
  { path: '/sso-login', element: <SsoLogin /> },
  { path: '/error', element: <Error /> },
  {
    path: '/test',
    element: (
      <RequireAuth>
        <Test />
      </RequireAuth>
    ),
  },

  { path: '*', element: <NotFound /> },
]

// 路由组件
const Router = () => {
  return useRoutes(routes)
}

export default Router
