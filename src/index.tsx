import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ProductProvider } from './context/ProductProvider';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './pages/homePage';
import { ProductsPage } from './pages/productsPage';
import { ProductDetailsPage } from './pages/productDetailsPage';
import { Favorites } from './pages/favorites';
import { Cart } from './pages/cart';
import { PageNotFound } from './pages/pageNotFound';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones">
            <Route index element={<ProductsPage category="phones" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductsPage category="tablets" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<ProductsPage category="accessories" />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </ProductProvider>
  </Router>,
);
