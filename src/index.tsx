import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. ЗАМІНЮЄМО BrowserRouter на HashRouter
import { HashRouter } from 'react-router-dom';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* 2. Обгортаємо App у HashRouter (тут basename вже не потрібен!) */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
