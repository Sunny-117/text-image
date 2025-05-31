import { useEffect, useState } from "react";
import { createCodeFormatterPlugin } from "ai-code-formatter-plugin";

function DocumentationPage() {
  const [plugins, setPlugins] = useState<
    ReturnType<typeof createCodeFormatterPlugin>[]
  >([]);
  const [codeExamples] = useState([
    {
      id: "basic-js",
      title: "Basic JavaScript Example",
      code: "```js\n// Simple function\nexport function add(a, b) {\n  return a + b;\n}\n```",
    },
    {
      id: "react-component",
      title: "React Component",
      code: "```jsx\nimport React from 'react';\n\nfunction Button({ children }) {\n  return <button className=\"primary-btn\">{children}</button>;\n}\n```",
    },
    {
      id: "python-example",
      title: "Python Function",
      code: '```python\ndef fibonacci(n):\n    """Generate Fibonacci sequence"""\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n```',
    },
  ]);

  useEffect(() => {
    const initializedPlugins: ReturnType<typeof createCodeFormatterPlugin>[] =
      [];

    try {
      codeExamples.forEach((example) => {
        const container = document.getElementById(example.id);
        if (container) {
          const plugin = createCodeFormatterPlugin();
          plugin.render({
            container,
            content: example.code,
          });
          initializedPlugins.push(plugin);
        }
      });

      setPlugins(initializedPlugins);
    } catch (error) {
      console.error("Failed to initialize code formatters:", error);
    }

    // Cleanup function
    return () => {
      initializedPlugins.forEach((plugin) => {
        try {
          plugin.unmount();
        } catch (e) {
          console.warn("Error while unmounting plugin:", e);
        }
      });
    };
  }, [codeExamples]);

  const handleUpdateCode = (id: string, newCode: string) => {
    const container = document.getElementById(id);
    if (container) {
      const plugin = plugins[codeExamples.findIndex((ex) => ex.id === id)];
      if (plugin) {
        plugin.update(newCode);
      }
    }
  };

  return (
    <div className="documentation-container">
      <header>
        <h1>API Documentation</h1>
        <p>Interactive code examples with real-time formatting</p>
      </header>

      <main className="examples-grid">
        {codeExamples.map((example) => (
          <section key={example.id} className="example-card">
            <div className="example-header">
              <h2>{example.title}</h2>
              <button
                onClick={() =>
                  handleUpdateCode(
                    example.id,
                    example.code +
                      "\n// Last updated: " +
                      new Date().toLocaleTimeString()
                  )
                }
                className="refresh-btn"
              >
                Update Timestamp
              </button>
            </div>
            <div
              id={example.id}
              className="code-sample"
              data-code={example.code}
            />
            <div className="example-actions">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    example.code.replace(/```[\w]*/g, "").trim()
                  )
                }
                className="copy-btn"
              >
                Copy Raw Code
              </button>
            </div>
          </section>
        ))}
      </main>

      <footer className="doc-footer">
        <p>All code examples are interactive and formatted in real-time</p>
      </footer>
    </div>
  );
}

export default DocumentationPage;
