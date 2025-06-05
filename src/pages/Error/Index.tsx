import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.less'

const Error: React.FC = () => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/sso-login?tokenCode=123')
  }

  return (
    <div className="page-container">
      <div className={styles['sso-box']}>
        <div> ERROR</div>
        <Button type="primary" onClick={handleBackToLogin} style={{ marginTop: 16 }}>
          返回登录
        </Button>
      </div>
    </div>
  )
}

export default Error
