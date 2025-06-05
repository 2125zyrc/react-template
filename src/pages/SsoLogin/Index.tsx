import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAtom, useSetAtom } from 'jotai'
import styles from './styles.module.less'
import { getAccessToken } from '@/api/user'
import { accessTokenAtom, userAtom } from '@/store/app'
import { useMount } from 'ahooks'

const SsoLogin: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tokenCode = searchParams.get('tokenCode')

  const setAccessToken = useSetAtom(accessTokenAtom)
  const setUser = useSetAtom(userAtom)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const handleSsoLogin = async () => {
    setIsLoading(true)
    try {
      const { data } = await getAccessToken({ tokenCode })
      const { accesstoken, user } = data
      setAccessToken(accesstoken)
      setUser(JSON.stringify(user || {}))
      setIsError(false)
      navigate('/device-list')
    } catch (e) {
      setIsError(true)
      handleClear()
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClear = () => {
    // setAccessToken('')
    // setUser('{}')
  }
  useMount(() => {
    handleSsoLogin()
  })

  return (
    <div className="page-container">
      <div className={styles['error-box']}>
        <div>
          {isLoading && !isError && '正在登录中...'}
          {!isLoading && !isError && '登录成功，正在跳转...'}
          {!isLoading && isError && '登录失败，请重试'}
        </div>
      </div>
    </div>
  )
}

export default SsoLogin
