import React, { useEffect, useRef } from "react";
import "./styles.css";

interface HighlightProps {
  language: string;
  children: string;
}

/**
 * 代码高亮组件
 * @param language 编程语言
 * @param children 代码内容
 */
export const Highlight: React.FC<HighlightProps> = ({ language, children }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      // 在实际应用中，这里可以集成Prism.js或highlight.js
      // 此处添加模拟的高亮类
      codeRef.current.className = `code-block language-${language}`;
    }
  }, [children, language]);

  return (
    <pre className="code-pre">
      <code ref={codeRef}>{children}</code>
    </pre>
  );
};
