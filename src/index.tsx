import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { ProductContextProvider } from './modules/shared/Utills/ProductContext';
import { FavoritesContextProvider } from './modules/shared/Utills/FavoritesContext';
import { ShopingCartContextProvider } from './modules/shared/Utills/ShopingCartContext';
import ScrollToTop from './modules/shared/componets/ScrollToTop/ScrollToTop';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ShopingCartContextProvider>
    <FavoritesContextProvider>
      <ProductContextProvider>
        <Router>
          <ScrollToTop>
            <App />
          </ScrollToTop>
        </Router>
      </ProductContextProvider>
    </FavoritesContextProvider>
  </ShopingCartContextProvider>,
);
