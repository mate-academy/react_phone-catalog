/* eslint-disable max-len */
import { createRoot } from 'react-dom/client';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './Functional/CartContext/CartContext';
import { HomePage } from './Pages/HomePage/HomePage';
import { Aside } from './components/Aside/Aside';
import { PhonePage } from './Pages/PhonePage/PhonePage';
import { TabletPage } from './Pages/TabletPage/TabletPage';
import { AccessoriesPage } from './Pages/AccessoriesPage/Accessories';
import { ProductDetailsPage } from './Pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './Pages/FunctionalPages/CartPage/CartPage';
import { FavoritesPage } from './Pages/FunctionalPages/FavoritesPage/FavoritesPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';

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
          <Route path="products/:productId" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </CartProvider>
  </Router>
);

createRoot(document.getElementById('root') as HTMLElement).render(<Root />);
