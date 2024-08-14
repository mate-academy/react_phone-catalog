import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
// eslint-disable-next-line max-len
import { ThemeProvider } from './modules/shared/components/Contexts/ThemeContext';
// eslint-disable-next-line max-len
import { LanguageProvider } from './modules/shared/components/Contexts/LanguageContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <LanguageProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LanguageProvider>
  </HashRouter>,
);
