import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.scss';
import './utils/i18n';
import { App } from './App.tsx';
import { AppProvider } from './context/AppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </HashRouter>,
);
