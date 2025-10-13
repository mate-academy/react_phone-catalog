import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/HomePage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CardPage';
import { TabsProvider } from './ProductsContext/TabsContext';
import { FavouriteProvider } from './ProductsContext/FavouriteContext';
import { CartProvider } from './ProductsContext/CartContext';

createRoot(document.getElementById('root') as HTMLElement).render(
  <TabsProvider>
    <CartProvider>
      <FavouriteProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path=":category" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </FavouriteProvider>
    </CartProvider>
  </TabsProvider>,
);
