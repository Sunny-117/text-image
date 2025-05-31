import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['./src/core/index.tsx'],
    format: ['esm', 'cjs', 'iife'], // 相当于 rollup 的多格式输出
    dts: {
        compilerOptions: {
            jsx: "react-jsx",
            lib: ["ES2023", "DOM"],
            allowSyntheticDefaultImports: true
        }
    }, // 生成类型声明文件并指定 JSX/DOM 配置
    sourcemap: true, // 生成 sourcemap
    name: 'codeDetectorSdk',
    globalName: 'codeDetectorSdk',
    platform: 'browser', // 指定为浏览器环境
    target: 'es2015', // 编译目标
    external: ['react', 'react-dom'], // 外部依赖
    esbuildOptions: (options) => {
        options.jsx = 'automatic'
    }
})