import React, { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/styles/monokai-sublime.css";
import "./styles.css";

export type Theme = "github" | "atom-one-dark" | "monokai-sublime";
interface HighlightProps {
  language?: string;
  children: string;
  theme?: Theme;
}

const themeStyleId = "hljs-theme-style";
const themeCssMap: Record<Theme, string> = {
  github: "highlight.js/styles/github.css",
  "atom-one-dark": "highlight.js/styles/atom-one-dark.css",
  "monokai-sublime": "highlight.js/styles/monokai-sublime.css",
};

function setHighlightTheme(theme: Theme) {
  // 移除旧的 style/link
  const old = document.getElementById(themeStyleId);
  if (old) old.remove();
  // 创建新的 link
  const link = document.createElement("link");
  link.id = themeStyleId;
  link.rel = "stylesheet";
  link.href = themeCssMap[theme];
  document.head.appendChild(link);
}

/**
 * 代码高亮组件
 * @param language 编程语言
 * @param children 代码内容
 */
export const Highlight: React.FC<HighlightProps> = ({
  language,
  children,
  theme = "github",
}) => {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHighlightTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (codeRef.current) {
      // 先移除 highlight.js 的 data-highlighted 属性，避免重复高亮报错
      codeRef.current.removeAttribute("data-highlighted");
      if (language && hljs.getLanguage(language)) {
        hljs.highlightElement(codeRef.current);
      } else {
        hljs.highlightAuto(codeRef.current.innerText);
      }
    }
  }, [language, children, theme]);

  return (
    <pre>
      <code
        ref={codeRef}
        className={language ? `language-${language}` : undefined}
      >
        {children}
      </code>
    </pre>
  );
};
