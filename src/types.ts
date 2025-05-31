// 定义代码块类型
export type CodeBlock = {
  type: 'code' | 'text';
  language?: string;
  content: string;
};

// 流式模拟器配置
export type StreamingSimulatorConfig = {
  chunks: string[];
  interval?: number;
  initialContent?: string;
};

// 格式化插件选项
export type CodeFormatterPluginOptions = {
  container: HTMLElement;
  content: string;
};