import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ShopProvider } from './context/ShopContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ShopProvider>
      <App />
    </ShopProvider>
  </HashRouter>,
);
