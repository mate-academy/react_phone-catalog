// src/index.tsx
import React from 'react';
import i18n from './i18n';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ThemeProvider } from './../src/context/ThemeContext';
import './../src/styles/themes.css';

export default function LanguageSwitcher() {
  return (
    <select
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      aria-label="Selecionar idioma"
    >
      <option value="en">English</option>
      <option value="pt">Português</option>
    </select>
  );
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
