import '@/i18n/i18n';
import '@/styles/global.scss';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { QueryProvider } from './providers/QueryProvider';

const rootElement = document.getElementById('root') as HTMLElement;

createRoot(rootElement).render(
  <QueryProvider>
    <App />
  </QueryProvider>,
);
