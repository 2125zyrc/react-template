import React, { useEffect } from 'react'
import { Card, Typography, Button, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './styles.module.less'

const SsoLogin: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const handleSsoLogin = async () => {
    // try {
    //   // TODO: Replace with your actual SSO login logic
    //   // This is a placeholder for the SSO authentication flow
    //   const ssoUrl =
    //     process.env.REACT_APP_SSO_URL || 'https://your-sso-provider.com/login'
    //   window.location.href = ssoUrl
    // } catch (error) {
    //   message.error('SSO login failed. Please try again.')
    // }
  }

  useEffect(() => {
    console.log('Current token:', token)
    if (token) {
      //TODO
    } else {
      navigate('/error')
    }
  }, [token])

  return (
    <div className="page-container">
      <div className={styles['error-box']}>正在登录中...</div>
    </div>
  )
}

export default SsoLogin
