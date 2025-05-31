import React, { useRef, useEffect } from "react";
import { CodeFormatter } from "../core/codeFormatter";
import { useStreamingSimulator } from "../core/streamingSimulator";
import { CodeFormatterPlugin } from "../core/plugin";
import type { StreamingSimulatorConfig } from "../types";

const DemoApp: React.FC = () => {
  // 流式数据配置
  const streamConfig: StreamingSimulatorConfig = {
    chunks: [
      "以下是一个React组件的示例代码：\n\n```jsx\n",
      "import React, { useState } from 'react';\n\n",
      "const Counter = () => {\n",
      "  const [count, setCount] = useState(0);\n\n",
      "  return (\n",
      '    <div className="counter">\n',
      "      <p>当前计数: {count}</p>\n",
      "      <button onClick={() => setCount(count + 1)}>增加</button>\n",
      "      <button onClick={() => setCount(count - 1)}>减少</button>\n",
      "    </div>\n",
      "  );\n",
      "};\n\n",
      "export default Counter;\n",
      "```\n\n",
      "这个组件实现了一个简单的计数器。\n\n",
      "接下来是一个Python函数的示例：\n\n```python\n",
      "def fibonacci(n):\n",
      '    """生成斐波那契数列"""\n',
      "    a, b = 0, 1\n",
      "    result = []\n",
      "    while len(result) < n:\n",
      "        result.append(a)\n",
      "        a, b = b, a + b\n",
      "    return result\n",
      "```\n\n",
      "这个函数生成斐波那契数列。",
    ],
    interval: 50,
    initialContent: "",
  };

  const { content, isStreaming, startStreaming } =
    useStreamingSimulator(streamConfig);

  // 演示SDK使用
  const sdkDemoRef = useRef<HTMLDivElement>(null);
  const pluginRef = useRef<CodeFormatterPlugin | null>(null);

  useEffect(() => {
    if (sdkDemoRef.current && !pluginRef.current) {
      pluginRef.current = new CodeFormatterPlugin();
      pluginRef.current.render({
        container: sdkDemoRef.current,
        content: 'SDK渲染示例：\n```js\nconsole.log("Hello from SDK!");\n```',
      });
    }

    return () => {
      if (pluginRef.current) {
        pluginRef.current.unmount();
      }
    };
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI 代码格式化渲染器</h1>
        <p>模块化 TypeScript 实现 | 流式渲染 | 插件架构</p>
      </header>

      <main className="main-content">
        <section className="demo-section">
          <div className="controls">
            <button
              onClick={startStreaming}
              disabled={isStreaming}
              className="stream-button"
            >
              {isStreaming ? "流式传输中..." : "开始模拟流式传输"}
            </button>
          </div>

          <div className="demo-output">
            <CodeFormatter content={content} />
          </div>
        </section>

        <section className="sdk-section">
          <h2>插件 SDK 演示</h2>
          <div ref={sdkDemoRef} className="sdk-demo"></div>
        </section>
      </main>

      <footer className="app-footer">
        <div className="features">
          <div className="feature-card">
            <h3>模块化设计</h3>
            <p>核心逻辑与UI分离，易于维护和扩展</p>
          </div>
          <div className="feature-card">
            <h3>流式渲染</h3>
            <p>支持模拟服务器流式返回数据，实时渲染</p>
          </div>
          <div className="feature-card">
            <h3>插件架构</h3>
            <p>通用SDK设计，方便集成到各种应用场景</p>
          </div>
        </div>
        <p className="footer-note">
          AI代码格式化渲染器 © 2023 | TypeScript实现
        </p>
      </footer>
    </div>
  );
};

export default DemoApp;
