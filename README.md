# JianXiaoli - Cyberpunk Portfolio Website

一个具有赛博朋克风格的个人作品集网站，专为建筑工程师JianXiaoli设计。

## 🚀 项目特色

- **赛博朋克主题设计** - 深色背景，霓虹灯效果，终端风格界面
- **响应式布局** - 完美适配桌面、平板和移动设备
- **模块化架构** - 代码分离，易于维护和扩展
- **动画效果** - 滚动动画，打字效果，粒子系统
- **交互式元素** - 动态导航，表单验证，悬停效果

## 📁 项目结构

```
├── index.html              # 主HTML文件
├── css/                    # 样式文件目录
│   ├── reset.css          # CSS重置
│   ├── style.css          # 主样式文件
│   ├── animations.css     # 动画效果
│   └── components/        # 组件样式
│       ├── navigation.css
│       ├── hero.css
│       ├── about.css
│       ├── projects.css
│       ├── skills.css
│       ├── education.css
│       ├── contact.css
│       └── footer.css
├── js/                    # JavaScript文件目录
│   ├── main.js           # 主JavaScript文件
│   └── modules/          # 功能模块
│       ├── utils.js
│       ├── navigation.js
│       ├── particles.js
│       ├── projects.js
│       ├── skills.js
│       ├── education.js
│       ├── contact.js
│       ├── animations.js
│       └── typing.js
├── assets/               # 资源文件目录
│   └── images/
└── README.md            # 项目说明
```

## 🎨 设计主题

### 颜色方案
- **主背景色**: `#0A192F` (深蓝色)
- **次要背景色**: `#112240` (深蓝灰)
- **主文本色**: `#CCD6F6` (浅灰)
- **强调色**: 
  - 青色: `#64FFDA`
  - 洋红: `#F50057`
  - 紫色: `#7B00E0`
  - 橙色: `#FFA500`

### 字体
- **标题**: Orbitron, Montserrat
- **等宽字体**: Share Tech Mono, Roboto Mono
- **正文**: Open Sans, Roboto

## 🛠️ 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代CSS特性，Grid布局，Flexbox
- **JavaScript ES6+** - 模块化，异步编程
- **Web APIs** - Intersection Observer, Canvas API

## 📱 响应式设计

- **桌面**: > 768px
- **平板**: 481px - 768px  
- **手机**: ≤ 480px

## 🚀 快速开始

1. **克隆项目**
   ```bash
   git clone [repository-url]
   cd cyberpunk-portfolio
   ```

2. **本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用Live Server (VS Code扩展)
   ```

3. **访问网站**
   打开浏览器访问 `http://localhost:8000`

## 🎯 功能模块

### 导航系统
- 固定顶部导航
- 平滑滚动
- 活动状态指示
- 移动端适配

### 英雄区域
- 打字动画效果
- 粒子背景
- 响应式布局

### 项目展示
- 动态加载项目数据
- 卡片式布局
- 悬停效果
- 技术标签

### 技能矩阵
- 进度条动画
- 分类展示
- 交互式元素

### 联系表单
- 实时验证
- 动画反馈
- 错误处理

## 🔧 自定义配置

### 修改个人信息
编辑以下文件中的数据：
- `js/modules/projects.js` - 项目信息
- `js/modules/skills.js` - 技能数据
- `js/modules/education.js` - 教育背景
- `js/modules/contact.js` - 联系方式

### 修改样式
- 颜色变量在 `css/style.css` 的 `:root` 中定义
- 组件样式在 `css/components/` 目录中
- 动画效果在 `css/animations.css` 中

### 添加新功能
1. 在 `js/modules/` 中创建新模块
2. 在 `js/main.js` 中导入并初始化
3. 添加对应的CSS样式

## 🌟 特殊效果

### 粒子系统
- 支持 particles.js 库
- 自动降级到CSS动画
- 响应式适配

### 打字效果
- 多种打字动画
- 故障效果
- 矩阵雨效果

### 滚动动画
- Intersection Observer API
- 渐进式增强
- 性能优化

## 📝 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 📞 联系方式

- **邮箱**: jianlixiazai@qq.com
- **电话**: +86-188-8888-8888

---

**注意**: 这是一个演示项目，联系信息为示例数据。实际使用时请替换为真实信息。 