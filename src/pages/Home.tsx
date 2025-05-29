import React from 'react'
import { Button, Spin, Alert } from 'antd'
import { useState } from 'react'
import Test from './Test'
import { createApi } from '@/hooks/useApi'

// 创建用户相关的 API hooks

const Home = () => {
  const userApi = createApi('https://uapis.cn/api/myip.php1/xxx')

  const [page, setPage] = useState({
    page: 2,
    limit: 10,
    time: 0,
  })

  // 使用 userApi hook 获取数据
  const aaa = userApi.useGet(page)

  const handleClick = () => {
    setPage((prev) => ({
      ...prev,
      page: prev.page + 1,
      time: new Date().getTime(),
    }))
  }

  return (
    <div>
      <Test />
      <Button type="primary" onClick={handleClick}>
        下一页{page.page}
      </Button>
      {/* 展示数据 */}
      <div style={{ marginTop: 20 }}>
        <pre>{JSON.stringify(aaa, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Home
