# <%= project %>

# 目录结构

```
├── src
│   ├── assets
│   │    └── react.svg
│   ├── store
│   │     └── modules // 模块数据
│   ├── services
│   ├── pages
│   ├── components
│   ├── env
│   ├── constant // 常量
│   ├── hooks
│   ├── types // 类型
│   ├── App.vue
│   ├── style.css
│   ├── main.js
│   ├── menu.ts // 菜单配置
│   ├── route.ts // route配置
│   ├── utils // 工具函数集合
│   ├── mock // mock接口
│   └── logo.svg
├── index.html
├── package.json
└── vite.config.js
```

# 约定行为

## 关于环境

不同环境配置在 env目录下
注意 暴露给页面使用的需要加VITE前缀
package里有不同环境的打包方式

---

## 关于mock

mock预设为 test 与 prod(根据import.meta.env.MODE 决定 prod模式时 使用的是prod文件下的mock 其他的都是用的test下的mock)
需要增加更多环境支持可以在 mock/index.ts修改

---

## 关于插件

内设了几款插件
wa-window-vue 工具库

---

## 关于自适应

默认使用wx作为自适应css单位 可在vite.config.ts的postCssPxToRem配置unit 当css文件使用配置的单位时 会根据html字体大小转成相应的rem
html 字体大小在 src\style.css 文件设置
