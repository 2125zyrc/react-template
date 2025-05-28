import { Outlet } from 'react-router-dom'

function Layout2() {
  return (
    <div>
      <div>布局</div>
      {/* Layout2 相关样式或侧边栏 */}
      {/* ...existing layout2 UI... */}
      <Outlet />
    </div>
  )
}

export default Layout2
