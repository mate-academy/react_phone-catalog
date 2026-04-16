import { createRoot } from 'react-dom/client';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { ShopProvider } from './store/shop/ShopContext';
import { ThemeProvider } from './store/theme/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <ShopProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ShopProvider>
  </BrowserRouter>,
);
