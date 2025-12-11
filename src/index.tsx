// src/index.tsx

import './styles/vars.css';
import './App.module.css';
import './../src/styles/themes.css';
import React from 'react';
import { App } from './App';
import i18n from './i18n';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './../src/context/ThemeContext';
import { SearchVisibilityProvider } from './context/SearchVisibilityContext';

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
      <SearchVisibilityProvider>
        <App />
      </SearchVisibilityProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
