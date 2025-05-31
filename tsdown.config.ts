import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: ['./src/core/index.tsx'],
    format: ['esm', 'cjs', 'iife'], // 相当于 rollup 的多格式输出
    dts: true, // 生成类型声明文件
    sourcemap: true, // 生成 sourcemap
    name: 'ai-code-formatter-plugin', // 相当于 lib.name
    globalName: 'ai-code-formatter-plugin', // 用于 iife 格式的全局变量名
    platform: 'browser', // 指定为浏览器环境
    target: 'es2015', // 编译目标
    external: ['react', 'react-dom'], // 外部依赖
    outputOptions: {
        extend: true
    }
})