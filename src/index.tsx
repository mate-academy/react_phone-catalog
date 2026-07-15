import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/reset.scss';
import './styles/variables.scss';
import './styles/global.scss';
import { GlobalProvider } from './context/GlobalContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { HashRouter } from 'react-router-dom';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <GlobalProvider>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
    </GlobalProvider>
  </HashRouter>,
);
