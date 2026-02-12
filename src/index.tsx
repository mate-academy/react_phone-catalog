import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { ShopProvider } from './context/shopContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ShopProvider>
      <App />
    </ShopProvider>
  </HashRouter>,
);
