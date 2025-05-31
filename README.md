# Code Formatter Plugin

## README

### 介绍
AI 代码格式化插件是一个强大的React组件库，专为AI问答场景设计，能够智能识别和渲染流式返回的代码内容。它提供了一套完整的解决方案，包括代码块检测、语法高亮、流式数据模拟和插件化集成能力。

### 安装
```bash
npm install ai-code-formatter-plugin
# 或
yarn add ai-code-formatter-plugin
```

### 基本使用
```jsx
import { CodeFormatter } from 'ai-code-formatter-plugin';

function App() {
  const content = `
    这是一个React组件示例：
    \`\`\`jsx
    import React from 'react';
    
    function Hello() {
      return <h1>Hello World!</h1>;
    }
    \`\`\`
  `;

  return (
    <div className="app">
      <CodeFormatter content={content} />
    </div>
  );
}
```

### 流式数据模拟
```jsx
import { useStreamingSimulator, CodeFormatter } from 'ai-code-formatter-plugin';

function StreamingDemo() {
  const streamConfig = {
    chunks: [
      '开始讲解代码：\n```js\n',
      'function sum(a, b) {\n',
      '  return a + b;\n',
      '}\n',
      '```\n\n这是一个简单的加法函数。'
    ],
    interval: 80
  };

  const { content, startStreaming } = useStreamingSimulator(streamConfig);

  return (
    <div>
      <button onClick={startStreaming}>开始模拟流式传输</button>
      <CodeFormatter content={content} />
    </div>
  );
}
```

### 插件SDK使用
```jsx
import { createCodeFormatterPlugin } from 'ai-code-formatter-plugin';

// 初始化插件
const plugin = createCodeFormatterPlugin();

// 在DOM元素中渲染
const container = document.getElementById('code-container');
if (container) {
  plugin.render({
    container,
    content: '```python\ndef greet():\n    print("Hello!")\n```'
  });
}

// 更新内容
plugin.update('新内容```js\nconsole.log("Updated");\n```');

// 卸载
plugin.unmount();
```

### 使用案例
1. **AI聊天机器人集成**
```jsx
import { CodeFormatter } from 'ai-code-formatter-plugin';

function AIChatMessage({ response }) {
  return (
    <div className="ai-response">
      <CodeFormatter content={response} />
    </div>
  );
}
```

2. **技术文档展示**
```jsx
import { createCodeFormatterPlugin } from 'ai-code-formatter-plugin';

function DocumentationPage() {
  useEffect(() => {
    const codeSections = document.querySelectorAll('.code-sample');
    codeSections.forEach(section => {
      const plugin = createCodeFormatterPlugin();
      plugin.render({
        container: section,
        content: section.dataset.code
      });
    });
  }, []);
  
  return (
    <div>
      <div className="code-sample" data-code="```js\n// 示例代码\n```"></div>
    </div>
  );
}
```

3. **编程教学平台**
```jsx
import { useStreamingSimulator, CodeFormatter } from 'ai-code-formatter-plugin';

function CodingTutorial() {
  const steps = [
    { chunks: ['第一步：基础语法\n```python\nprint("Hello")\n```'], interval: 100 },
    { chunks: ['第二步：函数定义\n```python\ndef add(a, b):\n    return a + b\n```'], interval: 100 }
  ];
  
  const [stepIndex, setStepIndex] = useState(0);
  const { content, startStreaming } = useStreamingSimulator(steps[stepIndex]);
  
  useEffect(() => {
    startStreaming();
  }, [stepIndex]);
  
  return (
    <div>
      <CodeFormatter content={content} />
      <button onClick={() => setStepIndex(i => i + 1)}>下一步</button>
    </div>
  );
}
```

### 核心架构

#### 模块化设计
```
src/
├── core/
│   ├── codeDetector.ts       # 代码块检测算法
│   ├── highlighter.tsx       # 语法高亮组件
│   ├── codeFormatter.tsx     # 主格式化组件
│   ├── streamingSimulator.ts # 流式模拟逻辑
│   └── plugin.ts             # 插件SDK实现
├── demo/                     # 演示应用
├── tests/                    # 单元测试
└── types.ts                  # 类型定义
```

#### 代码检测算法
1. **文本扫描**：使用三重反引号(```)作为代码块分隔符
2. **语言识别**：解析第一行获取编程语言标识
3. **内容提取**：智能处理代码块内的换行和缩进
4. **混合渲染**：无缝集成文本和代码块

#### 流式处理引擎
```ts
function useStreamingSimulator(config: {
  chunks: string[];   // 内容片段数组
  interval?: number;   // 传输间隔(ms)
  initialContent?: string;
}): {
  content: string;     // 当前内容
  isStreaming: boolean; // 传输状态
  startStreaming: () => void; // 启动函数
  stopStreaming: () => void;  // 停止函数
}
```

#### 插件架构
```ts
class CodeFormatterPlugin {
  // 渲染内容到指定容器
  render(options: { container: HTMLElement; content: string }): void;
  
  // 更新内容
  update(content: string): void;
  
  // 卸载组件
  unmount(): void;
}
```

#### 语法高亮系统
1. **语言分类**：基于检测到的语言添加CSS类名
2. **可扩展设计**：支持集成Prism.js等第三方高亮库
3. **主题支持**：提供深色/浅色主题选项
4. **复制功能**：每个代码块内置一键复制按钮
