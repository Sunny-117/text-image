# ai-interactive

## 项目架构

```
src/
├── core/                  # 核心格式化模块
│   ├── codeFormatter.ts   # 代码格式化逻辑
│   ├── codeDetector.ts    # 代码块检测逻辑
│   ├── highlighter.tsx    # 语法高亮组件
│   ├── streamingSimulator.ts # 流式模拟逻辑
│   └── plugin.ts          # 格式化插件SDK
├── demo/                  # 演示应用
│   ├── DemoApp.tsx        # 主应用组件
│   └── styles.css         # 演示样式
├── tests/                 # 测试代码
│   ├── codeDetector.test.ts
│   └── streamingSimulator.test.ts
├── index.tsx              # 应用入口
└── types.ts               # 类型定义
```