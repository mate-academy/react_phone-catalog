import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HashRouter } from 'react-router-dom';
import { ShopProvider } from './store/shop/ShopContext';
import { ThemeProvider } from './store/theme/ThemeContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <ShopProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ShopProvider>
  </HashRouter>,
);
