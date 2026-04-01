import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './store/ShopContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ShopProvider>
      <App />
    </ShopProvider>
  </BrowserRouter>,
);
