// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { createCodeFormatterPlugin } from "ai-code-formatter-plugin";

// 初始化插件
const plugin = createCodeFormatterPlugin();

// 在DOM元素中渲染
const container = document.getElementById("code-container");
if (container) {
  plugin.render({
    container,
    content: '```python\ndef greet():\n    print("Hello!")\n```',
  });
}

// 更新内容
plugin.update('新内容```js\nconsole.log("Updated");\n```');

// 卸载
setTimeout(() => {
  plugin.unmount();
}, 5000);
