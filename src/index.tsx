import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './i18n';

import { App } from './App';
import { ErrorBoundary } from './utils/errors';

import './styles/global.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <HashRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </HashRouter>
  </ErrorBoundary>,
);
