import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { StoreProvider } from './context/StoreContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <StoreProvider>
      <App />
    </StoreProvider>
  </BrowserRouter>,
);
