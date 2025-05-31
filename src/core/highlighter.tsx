import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/styles/monokai-sublime.css";
import "./styles.css";

interface HighlightProps {
  language?: string;
  children: string;
  theme?: 'github' | 'atom-one-dark' | 'monokai-sublime';
}

/**
 * 代码高亮组件
 * @param language 编程语言
 * @param children 代码内容
 */
export const Highlight: React.FC<HighlightProps> = ({ language, children, theme = 'github' }) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      if (language && hljs.getLanguage(language)) {
        hljs.highlightElement(codeRef.current);
      } else {
        hljs.highlightAuto(codeRef.current.innerText);
      }
    }
  }, [language, children]);

  // 主题样式映射
  const themeClass = {
    'github': 'hljs-github',
    'atom-one-dark': 'hljs-atom-one-dark',
    'monokai-sublime': 'hljs-monokai-sublime',
  }[theme];

  return (
    <pre className={themeClass}>
      <code
        ref={codeRef}
        className={language ? `language-${language}` : undefined}
      >
        {children}
      </code>
    </pre>
  );
};
