import { Navigate } from 'react-router-dom'

export const navigateTo = (path: string, replace: boolean = true) => {
  return <Navigate to={path} replace={replace} />
}
