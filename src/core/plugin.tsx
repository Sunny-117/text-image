import { createRoot, type Root } from "react-dom/client";
import { CodeFormatter } from "./codeFormatter";
import type { CodeFormatterPluginOptions } from "../types";

/**
 * 代码格式化插件SDK
 */
export class CodeFormatterPlugin {
  private root: Root | null = null;

  /**
   * 渲染格式化内容
   * @param options 插件选项
   */
  render(options: CodeFormatterPluginOptions) {
    if (this.root) {
      this.unmount();
    }

    this.root = createRoot(options.container);
    this.root.render(<CodeFormatter content={options.content} />);
  }

  /**
   * 更新内容
   * @param content 新的文本内容
   */
  update(content: string) {
    if (this.root) {
      this.root.render(<CodeFormatter content={content} />);
    }
  }

  /**
   * 卸载组件
   */
  unmount() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

/**
 * 创建代码格式化插件实例
 */
export const createCodeFormatterPlugin = () => {
  return new CodeFormatterPlugin();
};
