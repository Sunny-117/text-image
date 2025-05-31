import React, { useState } from "react";
import { Highlight, Theme } from "../core/highlighter";

const codeSamples = [
  {
    label: "JavaScript",
    language: "javascript",
    code: "function greet(name) {\n  return 'Hello, ' + name + '!';\n}",
  },
  {
    label: "Python",
    language: "python",
    code: `def greet(name):\n    return f"Hello, {name}!"`,
  },
  {
    label: "无语言自动识别",
    language: undefined,
    code: `SELECT * FROM users WHERE id = 1;`,
  },
];

const themes = [
  { label: "GitHub", value: "github" },
  { label: "Atom One Dark", value: "atom-one-dark" },
  { label: "Monokai Sublime", value: "monokai-sublime" },
] as const;

const HighlightDemo: React.FC = () => {
  const [theme, setTheme] = useState<Theme>("monokai-sublime");
  const [sampleIdx, setSampleIdx] = useState(0);

  return (
    <section className="highlight-demo-section">
      <h2>Highlight 代码高亮演示</h2>
      <div style={{ marginBottom: 16 }}>
        <label>主题：</label>
        {themes.map((t) => (
          <label key={t.value} style={{ marginRight: 8 }}>
            <input
              type="radio"
              name="theme"
              value={t.value}
              checked={theme === t.value}
              onChange={() => setTheme(t.value)}
            />
            {t.label}
          </label>
        ))}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>示例：</label>
        {codeSamples.map((s, i) => (
          <button
            key={s.label}
            style={{
              marginRight: 8,
              fontWeight: sampleIdx === i ? "bold" : "normal",
            }}
            onClick={() => setSampleIdx(i)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <Highlight language={codeSamples[sampleIdx].language} theme={theme}>
        {codeSamples[sampleIdx].code}
      </Highlight>
    </section>
  );
};

export default HighlightDemo;
