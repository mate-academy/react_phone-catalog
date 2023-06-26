import { Navigate, Route, Routes } from 'react-router-dom';

import './App.scss';
import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { PhonesPage } from '../../Routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../Routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../Routes/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from '../../Routes/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from '../../Routes/CartPage/CartPage';
import { FavoritesPage } from '../../Routes/FavoritesPage/FavoritesPage';
import { CartProvider } from '../../contexts/cartContext';

const App = () => {
  return (
    <div className="app">
      <CartProvider>
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route path=":productId" element={<ProductDetailsPage />} />
          </Route>
          <Route path="cart" element={<CartPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
        </Routes>
      </CartProvider>

      <Footer />
    </div>
  );
};

export default App;
