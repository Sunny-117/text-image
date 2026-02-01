import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm", 'iife'],
  outDir: 'lib',
  name: 'textImage',
  platform: "node",
  clean: true,
  dts: true
});
