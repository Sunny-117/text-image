import React from "react";
import { detectCodeBlocks } from "./codeDetector";
import { Highlight } from "./highlighter";

interface CodeFormatterProps {
  content: string;
}

/**
 * 代码格式化组件
 * @param content 要格式化的文本内容
 */
export const CodeFormatter: React.FC<CodeFormatterProps> = ({ content }) => {
  const blocks = detectCodeBlocks(content);

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
                  onClick={() => navigator.clipboard.writeText(block.content)}
                >
                  复制
                </button>
              </div>
              <Highlight language={block.language!} theme="monokai-sublime">
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
