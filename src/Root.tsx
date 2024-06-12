import { App } from './App';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { HomePage } from './modules/HomePage';
import { Favorites } from './modules/Favorites';
import { Cart } from './modules/Cart';
import { PhonePage } from './modules/PhonePage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetail } from './components/ProductDetail';
import { NotFoundPage } from './modules/NotFoundPage';

export const Root = () => (
  <HashRouter>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonePage />} />
          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProductProvider>
  </HashRouter>
);
