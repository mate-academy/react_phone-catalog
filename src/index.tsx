import { createRoot } from 'react-dom/client';
import { App } from './App';
import './i18n';
import { ContextProvider } from './components/UseCotext/ContextProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
    <App />
  </ContextProvider>,
);
