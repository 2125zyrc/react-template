import React from 'react'
import { Button } from 'antd'
import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import Test from './Test'
import { getList } from '@/api/user'
import { useApi } from '@/hooks/useApi'

const Home = () => {
  console.log('加载了')
  const [number, setNumber] = useState(0)
  const userApi = useApi('/abc')
  const latestNumber = useRef(number)
  const timestamp = useRef(Date.now())

  const aaa = userApi.useGet(
    { page: 1, limit: 10 },
    {
      enabled: false,
      gcTime: 0,
      staleTime: 0,
    },
  )

  console.log('Home timestamp:', timestamp.current)

  const getX = async () => {
    try {
      const res = await getList()
    } catch (e) {
      console.log('xxx', e)
    }
  }
  useEffect(() => {
    console.log(123)
    getX()
  }, [])

  const handleClick = () => {
    const newTime = Date.now()
    console.log('New timestamp:', newTime)
    timestamp.current = newTime
    aaa.refetch()
  }

  return (
    <div>
      <div>
        {aaa.isPending ? 'Loading...' : aaa.isError ? 'Error!' : 'Data loaded!'}
        <br />
        Status:{' '}
        {JSON.stringify({
          isPending: aaa.isPending,
          isLoading: aaa.isLoading,
          isError: aaa.isError,
          time: timestamp.current,
        })}
      </div>
      <Test></Test>
      <Button type="primary" onClick={handleClick}>
        Primary12 Button{number}
      </Button>
    </div>
  )
}

// export default React.memo(Home)
// export default React.memo(Home)
export default Home
