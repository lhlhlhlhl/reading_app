# reading 读书 App
## 技术栈
- React 全家桶
    - React组件开发
        组件的封装
        第三方组件库
        受控和非受控
        hooks编程 自定义的hooks
    - React-router-dom
        SPA
        路由守卫
        懒加载
    - Zustand
- mock 接口模拟
- axios 请求拦截和代理
- jwt进行登入
- module css
- vite 配置
- 性能优化
    防抖节流
    useCallback useMemo
- css预处理器 stylus
    flex transition transform
- LLM 大模型
    - chat
    - 生图
    - 语音
    - coze 工作流 调用
    - 流式输出
- 移动端适配
    rem
- 单例模式 设计模式的理解
## 项目的架构
- components
- pages
- store
- api
- hook
- mock
- llm
- utils
## 开发前的准备
- 安装的包
    react-router-dom
    zustand
    axios
    vite-plugin-mock
    lib-flexible(解决移动端适配)
    开发期间的依赖
        jwt
        react-vant 第三方的UI组件库
- vite 配置
    - alias
    - mock
    - .env.local
    llm apiKey
    - user-scalable=no 不允许用户缩放
    - css 预处理
        box-sizing font-family:-apply-system
        怎么区分 index.css,App.css,module.css
        index.css  reset
        App.css 全局样式
        module.css 模块化样式
    - 移动端的适配 rem
        不能用px,用相对单位rem html
        不同设备上体验要一致
        不同尺寸手机 等比例缩放
        设计师的设计稿 750px iphone 4 375pt
        小米
        css 一行代码 手机的不同尺寸 html font-size 等比例
        layout
        flexible.js 阿里 在任何设备上
        1 rem = 屏幕宽度/10

- lib-flexible 
    阿里开源
    设置html font-size = window.innerWidth/10
    css的px 像素宽度 = 手机设备宽度 = 375
    1px = 2发光源
    750px 设计稿

- 设计稿上查看一个盒子的大小？
    - 一像素不差的还原设计稿
    - 设计稿中像素单位
    - /75