import React, { useState } from "react";
import { detectCodeBlocks } from "./codeDetector";
import { Highlight } from "./highlighter";

interface CodeFormatterProps {
  content: string;
  theme?: import("./highlighter").Theme;
}

/**
 * 代码格式化组件
 * @param content 要格式化的文本内容
 */
export const CodeFormatter: React.FC<CodeFormatterProps> = ({
  content,
  theme = "monokai-sublime",
}) => {
  const blocks = detectCodeBlocks(content);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <div className="formatted-content">
      {blocks.map((block, index) => {
        if (block.type === "code") {
          return (
            <div key={index} className="code-container">
              <div className="code-header">
                <span className="code-language">{block.language}</span>
                <button
                  className="copy-button"
                  onClick={() => {
                    navigator.clipboard.writeText(block.content);
                    setIsCopied(true);
                    // 2秒后恢复"复制"状态
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                >
                  {isCopied ? "✓" : "复制"}
                </button>
              </div>
              <Highlight language={block.language!} theme={theme}>
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
