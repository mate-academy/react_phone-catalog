import { Routes, Route, HashRouter } from 'react-router-dom';
import { App } from './App';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import HomaPage from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import ProductDetails from './pages/ProductDetailsPage/ProductDetailsPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import CartPage from './pages/CartPage/CartPage';

export const Root = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomaPage />} />
          <Route path="phones" element={<ProductsPage category="phones" />} />
          <Route path="tablets" element={<ProductsPage category="tablets" />} />
          <Route
            path="accessories"
            element={<ProductsPage category="accessories" />}
          />
          <Route path=":category/:productId" element={<ProductDetails />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Root;
