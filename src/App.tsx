import { Navigate, Route, Routes } from 'react-router-dom';

import { AppLayout } from './components/AppLayout';
import { Home } from './pages/Home';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Favourites } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';

import './App.scss';

export const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="phones/:productId" element={<ProductDetailsPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="tablets/:productId" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route
            path="accessories/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
