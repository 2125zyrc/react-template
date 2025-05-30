import './styles/globel.less'

import { BrowserRouter } from 'react-router-dom'
import { queryClient } from '@/hooks/useApi'
import { QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import Router from './router'
import './App.css'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
