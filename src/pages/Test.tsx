import React from 'react'

const Test = () => {
  console.log('加载了测试')
  return (
    <div>
      <h1>测试2</h1>
    </div>
  )
}

export default React.memo(Test)
