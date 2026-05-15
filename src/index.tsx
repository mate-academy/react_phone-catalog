/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './Functional/CartContext/CartContext';
import { HomePage } from './pages/HomePage/HomePage';
import { Aside } from './components/Aside/Aside';
import { PhonePage } from './pages/PhonePage/PhonePage';
import { TabletPage } from './pages/TabletPage/TabletPage';
import { AccessoriesPage } from './pages/AccessoriesPage/Accessories';
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/FunctionalPages/CartPage/CartPage';
import { FavoritesPage } from './pages/FunctionalPages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
const Root = () => (
  <Router>
    <CartProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<Aside />} />
          <Route path="phones" element={<PhonePage />} />
          <Route path="tablets" element={<TabletPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path=":category/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </Router>
);
createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
