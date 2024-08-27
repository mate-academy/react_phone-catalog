import { createRoot } from 'react-dom/client';
import { App } from './App';
import './main.scss';
import { GlobalStateProvider } from './store/GlobalStateProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
  <GlobalStateProvider>
    <App />
  </GlobalStateProvider>,
);
