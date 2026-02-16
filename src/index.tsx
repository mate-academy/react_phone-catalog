import { createRoot } from 'react-dom/client';
import { App } from './App';
import { StateProvider } from './state/provider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StateProvider>
    <App />
  </StateProvider>,
);
