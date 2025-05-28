import { Outlet } from 'react-router-dom'

function Layout1() {
  return (
    <div>
      <div>布局122</div>
      {/* Layout1 相关样式或导航 */}
      {/* ...existing layout1 UI... */}
      <Outlet />
    </div>
  )
}

export default Layout1
