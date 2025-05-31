import type { CodeBlock } from './types';

/**
 * 检测文本中的代码块
 * @param text 输入文本
 * @returns 检测到的代码块数组
 */
export const detectCodeBlocks = (text: string): CodeBlock[] => {
  const blocks: CodeBlock[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const startIdx = text.indexOf('```', currentIndex);

    // 没有代码块标记，添加剩余文本
    if (startIdx === -1) {
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
      break;
    }

    // 添加代码块之前的文本
    if (startIdx > currentIndex) {
      blocks.push({
        type: 'text',
        content: text.slice(currentIndex, startIdx)
      });
    }

    // 查找代码块结束位置
    const endIdx = text.indexOf('```', startIdx + 3);

    // 没有结束标记，将剩余内容视为代码
    if (endIdx === -1) {
      const codeContent = text.slice(startIdx + 3);
      blocks.push({
        type: 'code',
        language: 'unknown',
        content: codeContent
      });
      break;
    }

    // 提取语言和代码内容
    const headerLine = text.slice(startIdx + 3, endIdx).split('\n')[0].trim();
    const language = headerLine || 'unknown';
    const codeStartIndex = startIdx + 3 + headerLine.length;
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