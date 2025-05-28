import { atomUserInfo } from '@/store/app'
import React, { useEffect } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import { Button, DatePicker } from 'antd'

const Home = () => {
  const setUserInfo = useSetAtom(atomUserInfo)
  const info = useAtomValue(atomUserInfo)
  console.log('info', info)
  useEffect(() => {
    setUserInfo([
      {
        name: '小明',
        age: 18,
        permission: ['admin', 'user'],
      },
    ])
  }, [setUserInfo]) // 依赖数组中只包含 setUserInfo
  return (
    <div>
      <Button type="primary">Primary Button</Button>
      <h1>首页{info?.[0]?.age}</h1>
    </div>
  )
}

export default Home
