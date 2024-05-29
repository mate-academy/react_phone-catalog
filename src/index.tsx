import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';
import { LanguageProvider } from './store/LanguageProvider';
import { ThemeProvider } from './store/ThemeProvider';
import './styles/main.scss';
import { BreakPointsProvider } from './store/BreakPointsProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BreakPointsProvider>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </BreakPointsProvider>,
);
