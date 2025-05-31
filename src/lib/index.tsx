import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// 代码高亮库
const Highlight = ({ language, children }) => {
  const codeRef = useRef(null);
  
  useEffect(() => {
    if (codeRef.current) {
      // 在实际应用中，这里可以集成highlight.js等库
      // 此处简化实现，仅添加类名
      codeRef.current.className = `code-block language-${language}`;
    }
  }, [children, language]);
  
  return (
    <pre className="code-pre">
      <code ref={codeRef}>{children}</code>
    </pre>
  );
};

// 代码块检测器
const detectCodeBlocks = (text) => {
  const blocks = [];
  let currentIndex = 0;
  
  // 查找代码块标记
  while (currentIndex < text.length) {
    const startIdx = text.indexOf('```', currentIndex);
    
    if (startIdx === -1) {
      // 没有更多代码块
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
      break;
    }
    
    // 添加前面的文本
    if (startIdx > currentIndex) {
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex, startIdx)
      });
    }
    
    // 查找代码块结束位置
    const endIdx = text.indexOf('```', startIdx + 3);
    
    if (endIdx === -1) {
      // 没有结束标记，将剩余文本视为代码
      const codeContent = text.slice(startIdx + 3);
      blocks.push({
        type: 'code',
        language: 'unknown',
        content: codeContent
      });
      break;
    }
    
    // 提取语言和代码内容
    const codeHeader = text.slice(startIdx + 3, endIdx).split('\n')[0].trim();
    const language = codeHeader || 'unknown';
    const codeStartIndex = startIdx + 3 + codeHeader.length;
    const codeContent = text.slice(codeStartIndex, endIdx).trim();
    
    blocks.push({
      type: 'code',
      language,
      content: codeContent
    });
    
    currentIndex = endIdx + 3;
  }
  
  return blocks;
};

// 核心代码格式化渲染组件
const CodeFormatter = ({ content }) => {
  const blocks = detectCodeBlocks(content);
  
  return (
    <div className="formatted-content">
      {blocks.map((block, index) => {
        if (block.type === 'code') {
          return (
            <div key={index} className="code-container">
              <div className="code-header">
                <span className="code-language">{block.language}</span>
                <button className="copy-button">复制</button>
              </div>
              <Highlight language={block.language}>
                {block.content}
              </Highlight>
            </div>
          );
        }
        
        return (
          <div key={index} className="text-block">
            {block.content}
          </div>
        );
      })}
    </div>
  );
};

// 流式数据模拟器
const useStreamingSimulator = (initialContent, chunks, interval = 100) => {
  const [content, setContent] = useState(initialContent);
  const [isStreaming, setIsStreaming] = useState(false);
  const currentIndexRef = useRef(0);
  
  const startStreaming = () => {
    if (isStreaming) return;
    
    setIsStreaming(true);
    currentIndexRef.current = 0;
    setContent(initialContent);
    
    const timer = setInterval(() => {
      if (currentIndexRef.current < chunks.length) {
        setContent(prev => prev + chunks[currentIndexRef.current]);
        currentIndexRef.current++;
      } else {
        clearInterval(timer);
        setIsStreaming(false);
      }
    }, interval);
  };
  
  return { content, isStreaming, startStreaming };
};

// 代码格式化SDK
const createCodeFormatterPlugin = () => {
  return {
    render: (content, container) => {
      const root = createRoot(container);
      root.render(<CodeFormatter content={content} />);
      return {
        update: (newContent) => root.render(<CodeFormatter content={newContent} />),
        unmount: () => root.unmount()
      };
    }
  };
};

// 演示组件
const DemoApp = () => {
  // 模拟流式数据
  const streamChunks = [
    '以下是一个React组件的示例代码：\n\n```jsx\n',
    'import React, { useState } from \'react\';\n\n',
    'const Counter = () => {\n',
    '  const [count, setCount] = useState(0);\n\n',
    '  return (\n',
    '    <div className="counter">\n',
    '      <p>当前计数: {count}</p>\n',
    '      <button onClick={() => setCount(count + 1)}>增加</button>\n',
    '      <button onClick={() => setCount(count - 1)}>减少</button>\n',
    '    </div>\n',
    '  );\n',
    '};\n\n',
    'export default Counter;\n',
    '```\n\n',
    '这个组件实现了一个简单的计数器。\n\n',
    '接下来是一个Python函数的示例：\n\n```python\n',
    'def fibonacci(n):\n',
    '    """生成斐波那契数列"""\n',
    '    a, b = 0, 1\n',
    '    result = []\n',
    '    while len(result) < n:\n',
    '        result.append(a)\n',
    '        a, b = b, a + b\n',
    '    return result\n',
    '```\n\n',
    '这个函数生成斐波那契数列。'
  ];
  
  const { content, isStreaming, startStreaming } = useStreamingSimulator('', streamChunks, 50);
  
  // 演示SDK使用
  const sdkDemoRef = useRef(null);
  
  useEffect(() => {
    if (sdkDemoRef.current) {
      const plugin = createCodeFormatterPlugin();
      const sdkInstance = plugin.render('SDK渲染示例：\n```js\nconsole.log("Hello from SDK!");\n```', sdkDemoRef.current);
      
      return () => {
        sdkInstance.unmount();
      };
    }
  }, []);
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>AI代码格式化渲染器</h1>
        <p>模拟流式返回代码并实现格式化渲染</p>
      </header>
      
      <main className="main-content">
        <section className="demo-section">
          <div className="controls">
            <button 
              onClick={startStreaming} 
              disabled={isStreaming}
              className="stream-button"
            >
              {isStreaming ? '流式传输中...' : '开始模拟流式传输'}
            </button>
          </div>
          
          <div className="demo-output">
            <CodeFormatter content={content} />
          </div>
        </section>
        
        <section className="sdk-section">
          <h2>通用SDK渲染演示</h2>
          <div ref={sdkDemoRef} className="sdk-demo"></div>
        </section>
      </main>
      
      <footer className="app-footer">
        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>流式渲染</h3>
            <p>支持模拟服务器流式返回数据，实时渲染</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>代码高亮</h3>
            <p>自动识别代码语言，提供语法高亮显示</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔌</div>
            <h3>插件架构</h3>
            <p>通用SDK设计，方便集成到各种应用场景</p>
          </div>
        </div>
        <p className="footer-note">AI代码格式化渲染器 © 2023</p>
      </footer>
    </div>
  );
};
export default DemoApp;