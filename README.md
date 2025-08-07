# 微信读书APP前端实现

这是一个基于React和Zustand的微信读书APP前端实现，使用MockJS生成模拟数据，无需后端数据库即可运行。

## 功能特点

- **书架管理**：添加、移除、置顶、标记已读书籍
- **书籍分类**：支持主分类和子分类浏览
- **推荐书籍**：随机推荐书籍，支持换一批功能
- **阅读统计**：记录和展示阅读时长
- **本地存储**：使用localStorage保存书架信息
- **响应式设计**：适配桌面和移动设备

## 技术栈

- React
- Zustand (状态管理)
- MockJS (模拟数据)
- CSS Modules (样式隔离)

## 项目结构

```
reading/
├── src/
│   ├── pages/
│   │   ├── Home/       # 主页(书架+推荐)
│   │   └── Stacks/      # 书库(分类浏览)
│   ├── store/
│   │   └── useBookStore.js  # 书籍数据状态管理
│   ├── mock/
│   │   └── data.js     # 模拟数据生成
│   └── hooks/
│       └── useTitle.js  # 页面标题设置
└── README.md
```

## 如何运行

1. 安装依赖
```bash
npm install
```

2. 启动开发服务器
```bash
npm start
```

3. 在浏览器中打开 http://localhost:3000

## 数据持久化

- 书架信息保存在localStorage中
- 刷新页面后数据不会丢失
- 可以通过清除浏览器缓存来重置数据

## 自定义配置

1. 修改书籍分类：编辑 `mock/data.js` 中的 `CATEGORIES` 常量
2. 调整模拟数据：修改 `mock/data.js` 中的 `generateMockBooks` 函数
3. 更改UI样式：修改对应的CSS Modules文件

## 功能扩展建议

1. 添加书籍详情页面
2. 实现阅读页面和阅读进度保存
3. 添加搜索功能
4. 实现用户系统和云同步