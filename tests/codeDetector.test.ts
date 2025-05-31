import { detectCodeBlocks } from '../src/core/codeDetector';
import {
  describe,
  expect,
  test,
} from 'vitest'
describe('detectCodeBlocks', () => {
  test('检测纯文本', () => {
    const text = '这是一段没有代码的纯文本';
    const blocks = detectCodeBlocks(text);

    expect(blocks).toHaveLength(1);
    expect(blocks[0].type).toBe('text');
    expect(blocks[0].content).toBe(text);
  });

  test('检测单个代码块', () => {
    const text = '前置文本\n```js\nconsole.log("Hello");\n```\n后置文本';
    const blocks = detectCodeBlocks(text);

    expect(blocks).toHaveLength(3);
    expect(blocks[0].type).toBe('text');
    expect(blocks[1].type).toBe('code');
    expect(blocks[1].language).toBe('js');
    expect(blocks[1].content).toBe('console.log("Hello");');
    expect(blocks[2].type).toBe('text');
  });

});