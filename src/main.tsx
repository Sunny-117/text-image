import React from 'react';
import { createRoot } from 'react-dom/client';
import DemoApp from './demo/DemoApp';
import './demo/styles.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <DemoApp />
    </React.StrictMode>
  );
}