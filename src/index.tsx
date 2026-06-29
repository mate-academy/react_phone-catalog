import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductsContextProvider } from './store/ProductsContext';
import { FavoriteContextProvider } from './store/FavoriteContext';
import { CartContextProvider } from './store/CartContext';
import { LangContextProvider } from './store/LangContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ProductsContextProvider>
      <FavoriteContextProvider>
        <CartContextProvider>
          <LangContextProvider>
            <App />
          </LangContextProvider>
        </CartContextProvider>
      </FavoriteContextProvider>
    </ProductsContextProvider>
  </Router>,
);
