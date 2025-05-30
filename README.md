# Admin Dashboard

基于 Vite + React 的现代化管理后台项目。

## 技术栈

- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [React](https://reactjs.org/) - 用于构建用户界面的 JavaScript 库
- [Jotai](https://jotai.org/) - 原子化状态管理
- [@tanstack/react-query](https://tanstack.com/query/latest) - 数据获取和缓存库
- [Ant Design](https://ant.design/) - 企业级 UI 设计语言和 React 组件库
- [Prettier](https://prettier.io/) - 代码格式化工具
- [ESLint](https://eslint.org/) - 代码质量检查工具

## 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

## 项目设置

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 环境配置
在项目根目录创建 `.env` 文件，配置必要的环境变量：
```env
VITE_API_URL=你的API地址
VITE_APP_TITLE=应用标题
```

## 开发

启动开发服务器：
```bash
npm run dev
```

## 构建

构建生产环境代码：
```bash
npm run build
```

## 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查和格式化：

- 检查代码规范：
```bash
npm run lint
```

- 格式化代码：
```bash
npm run format
```

## 项目结构

```
src/
  ├── components/     # 公共组件
  ├── pages/         # 页面组件
  ├── hooks/         # 自定义 Hooks
  ├── services/      # API 服务
  ├── store/         # 状态管理
  ├── utils/         # 工具函数
  ├── App.tsx        # 应用入口
  └── main.tsx       # 主入口文件
```

## 开发规范

1. 组件开发
   - 使用函数式组件和 Hooks
   - 组件文件使用 PascalCase 命名
   - 组件内部状态使用 Jotai 管理

2. 样式开发
   - 使用 CSS Modules 或 styled-components
   - 遵循 Ant Design 设计规范

3. 代码提交
   - 提交前进行代码格式化
   - 确保通过 ESLint 检查
   - 编写清晰的提交信息

## 浏览器支持

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 许可证

[MIT](LICENSE)
