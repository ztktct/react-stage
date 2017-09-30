# React

## 信息
`master` 分支提供基础脚手架，标配`react` + `webpack` + `babel`，中规中矩的单页面项目脚手架
其他类型请查看其他分支对应`README`文件

## 技术栈
* React ^16.0.0
* React-dom ^16.0.0
* React-router-dom ^4.2.2
* webpack ^3.5.5
* babel ^6.26.0

## 命令
```bash
 $ npm run start # 启动项目
 $ npm run build # 编译打包
 $ npm run analyse # 分析包
```

## 项目结构
```
.
├── dist                     # 打包后的代码
├── webpack                  # webpack配置文件
├── src                      # 程序源文件
│   ├── index.js             # 程序启动和渲染
|   ├── App.jsx              # 项目真·入口，配置Provider + Router 等
│   ├── components           # 可复用的组件(Presentational Components)
│   ├── static               # 静态文件
│   ├── styles               # 样式文件
│   ├── routes               # 主路由和异步分割点
│   └── pages                # 页面文件
```

## 特性
- [x] 支持ES2015+
- [x] 支持SASS预处理器
- [x] 支持部分CSS3+新特性
- [x] 支持组件级热更新
- [x] 支持文件hash，有效解决缓存问题
- [x] ESlint代码规范检测
- [x] 分离公共依赖代码与业务代码
- [x] 代码拆分，支持页面级加载

## Tip
欢迎提交Issues && PR, :-D
