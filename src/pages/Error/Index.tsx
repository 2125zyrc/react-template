import React, { useEffect } from 'react'
import { Card, Typography, Button, message } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './styles.module.less'

const SsoLogin: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <div className="page-container">
      <div className={styles['sso-box']}>ERROR</div>
    </div>
  )
}

export default SsoLogin
