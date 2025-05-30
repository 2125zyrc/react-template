import React from 'react'
import { Button, Spin, Alert } from 'antd'
import { useState } from 'react'
import Test from './Test'
import { createApi } from '@/hooks/useApi'
import { useQueryClient } from '@tanstack/react-query'

// 创建用户相关的 API hooks

const Home = () => {
  const userApi = createApi('/system/device/list')
  const queryClient = useQueryClient()

  const [page, setPage] = useState({
    page: 2,
    limit: 10,
    time: 0,
  })

  // 使用 userApi hook 获取数据
  const { mutate, isPending, error, data } = userApi.usePost({
    onSuccess: (response) => {
      console.log('请求成功:', response)
      // 在这里处理数据转换
      const transformedData = {
        ...response,
        data: {
          ...response.data,
          transformed: true,
          timestamp: new Date().toISOString(),
        },
      }
      // 更新查询缓存
      queryClient.setQueryData(['/system/device/list', page], transformedData)
    },
    onError: (error) => {
      console.error('请求失败:', error)
    },
  })

  const handleClick = () => {
    mutate(page)
  }

  return (
    <div>
      <Test />
      <Button type="primary" onClick={handleClick} loading={isPending}>
        下一页
      </Button>

      {/* 错误提示 */}
      {error && (
        <Alert
          message="请求错误"
          description={error.message}
          type="error"
          showIcon
          style={{ marginTop: 20 }}
        />
      )}

      {/* 加载状态 */}
      {isPending && <Spin style={{ marginTop: 20 }} />}

      {/* 展示数据 */}
      {data && (
        <div style={{ marginTop: 20 }}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default Home
