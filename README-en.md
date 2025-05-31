# AI Code Formatter Plugin

English|[简体中文](./README.md)

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

![image](./assets/show.gif)

### Introduction
The AI Code Formatter Plugin is a powerful React component library designed for AI Q&A scenarios. It intelligently identifies and renders streamed code content, providing a complete solution including code block detection, syntax highlighting, streaming data simulation, and plugin integration capabilities.

### Installation
```bash
npm install ai-code-formatter-plugin
# or
yarn add ai-code-formatter-plugin
```

### Basic Usage
```jsx
import { CodeFormatter } from 'ai-code-formatter-plugin';
import 'ai-code-formatter-plugin/dist/index.css'

function App() {
  const content = `
    Here's a React component example:
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

### Streaming Simulation
```jsx
import { useStreamingSimulator, CodeFormatter } from 'ai-code-formatter-plugin';

function StreamingDemo() {
  const streamConfig = {
    chunks: [
      'Explaining code:\n```js\n',
      'function sum(a, b) {\n',
      '  return a + b;\n',
      '}\n',
      '```\n\nThis is a simple addition function.'
    ],
    interval: 80
  };

  const { content, startStreaming } = useStreamingSimulator(streamConfig);

  return (
    <div>
      <button onClick={startStreaming}>Simulate Streaming</button>
      <CodeFormatter content={content} />
    </div>
  );
}
```

### Plugin SDK Usage
```jsx
import { createCodeFormatterPlugin } from 'ai-code-formatter-plugin';

// Initialize plugin
const plugin = createCodeFormatterPlugin();

// Render to DOM element
const container = document.getElementById('code-container');
if (container) {
  plugin.render({
    container,
    content: '```python\ndef greet():\n    print("Hello!")\n```'
  });
}

// Update content
plugin.update('New content ```js\nconsole.log("Updated");\n```');

// Unmount

setTimeout(() => {
  plugin.unmount();
}, 5000);

```

### Use Cases
1. **AI Chatbot Integration**
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

2. **Technical Documentation**

please see the [demo](https://github.com/Sunny-117/code-formatter-plugin/blob/main/playground/src/DocumentationPage.tsx).

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
      <div className="code-sample" data-code="```js\n// Example code\n```"></div>
    </div>
  );
}
```

3. **Programming Tutorial Platform**
```jsx
import { useStreamingSimulator, CodeFormatter } from 'ai-code-formatter-plugin';

function CodingTutorial() {
  const steps = [
    { chunks: ['Step 1: Basic Syntax\n```python\nprint("Hello")\n```'], interval: 100 },
    { chunks: ['Step 2: Function Definition\n```python\ndef add(a, b):\n    return a + b\n```'], interval: 100 }
  ];
  
  const [stepIndex, setStepIndex] = useState(0);
  const { content, startStreaming } = useStreamingSimulator(steps[stepIndex]);
  
  useEffect(() => {
    startStreaming();
  }, [stepIndex]);
  
  return (
    <div>
      <CodeFormatter content={content} />
      <button onClick={() => setStepIndex(i => i + 1)}>Next Step</button>
    </div>
  );
}
```

### Core Architecture

#### Modular Design
```
src/
├── core/
│   ├── codeDetector.ts       # Code block detection algorithm
│   ├── highlighter.tsx       # Syntax highlighting component
│   ├── codeFormatter.tsx     # Main formatter component
│   ├── streamingSimulator.ts # Streaming simulation logic
│   └── plugin.ts             # Plugin SDK implementation
├── demo/                     # Demo application
├── tests/                    # Unit tests
└── types.ts                  # Type definitions
```

#### Code Detection Algorithm
1. **Text Scanning**: Use triple backticks (```) as code block delimiters
2. **Language Identification**: Parse first line for programming language
3. **Content Extraction**: Intelligently handle indentation and newlines
4. **Hybrid Rendering**: Seamlessly integrate text and code blocks

#### Streaming Engine
```ts
function useStreamingSimulator(config: {
  chunks: string[];   // Content fragments
  interval?: number;   // Transmission interval(ms)
  initialContent?: string;
}): {
  content: string;     // Current content
  isStreaming: boolean; // Transmission status
  startStreaming: () => void; // Start function
  stopStreaming: () => void;  // Stop function
}
```

#### Plugin Architecture
```ts
class CodeFormatterPlugin {
  // Render content to specified container
  render(options: { container: HTMLElement; content: string }): void;
  
  // Update content
  update(content: string): void;
  
  // Unmount component
  unmount(): void;
}
```

#### Syntax Highlighting System
1. **Language Classification**: Add CSS classes based on detected language
2. **Extensible Design**: Support integration with Prism.js etc.
3. **Theme Support**: Dark/light theme options
4. **Copy Functionality**: One-click copy button for each code block

### Advanced Features
1. **Custom Highlighting Engines**
```jsx
// Extend the Highlight component
import { Highlight } from 'ai-code-formatter-plugin';

function CustomHighlighter({ language, children }) {
  // Integrate with Prism.js
  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, [children, language]);

  return <code ref={ref} className={`language-${language}`}>{children}</code>;
}
```

2. **Performance Optimization**
```tsx
// Use memoization for better performance
const MemoizedFormatter = React.memo(CodeFormatter);

function ChatList({ messages }) {
  return (
    <div>
      {messages.map((msg, i) => (
        <MemoizedFormatter key={i} content={msg.content} />
      ))}
    </div>
  );
}
```

3. **Accessibility Enhancements**
```jsx
// Add ARIA attributes
<button 
  className="copy-button"
  aria-label="Copy code to clipboard"
  onClick={copyToClipboard}
>
  复制
</button>
```

4. **Custom Language Handlers**
```ts
// Register custom language parser
CodeFormatter.registerLanguage('my-lang', {
  detect: (code) => /special-pattern/.test(code),
  highlight: (code) => customHighlighter(code)
});
```

### Performance Metrics
| Feature | Performance | Details |
|---------|-------------|---------|
| Code Detection | <10ms (100KB text) | Optimized scanning algorithm |
| Rendering Speed | 60fps (typical usage) | Efficient React rendering |
| Memory Usage | <5MB (average) | Lightweight implementation |
| Bundle Size | 45KB (gzipped) | Tree-shakable components |

### Compatibility
| Environment | Support Level |
|-------------|---------------|
| React 16.8+ | Full support |
| TypeScript 4.0+ | Full support |
| Modern Browsers | Chrome, Firefox, Safari, Edge |
| Mobile Devices | Responsive design |
| SSR | Compatible with Next.js |

### Conclusion
The AI Code Formatter Plugin provides a comprehensive solution for rendering code in AI-generated content. Its modular architecture, streaming capabilities, and plugin system make it suitable for various applications from chatbots to documentation platforms. The TypeScript implementation ensures type safety and maintainability while the detailed documentation facilitates easy integration.


<!-- brage -->

[npm-version-src]: https://img.shields.io/npm/v/ai-code-formatter-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/ai-code-formatter-plugin
[npm-downloads-src]: https://img.shields.io/npm/dm/ai-code-formatter-plugin?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/ai-code-formatter-plugin
[bundle-src]: https://img.shields.io/bundlephobia/minzip/ai-code-formatter-plugin?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=ai-code-formatter-plugin
[license-src]: https://img.shields.io/github/license/Sunny-117/ai-code-formatter-plugin.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/Sunny-117/ai-code-formatter-plugin/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/ai-code-formatter-plugin
