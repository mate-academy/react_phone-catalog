import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';

import { HomePage } from '../../routes/HomePage/HomePage';
import { PhonesPage } from '../../routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../routes/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from '../../routes/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from '../../routes/CartPage/CartPage';
import { FavoritesPage } from '../../routes/FavoritesPage/FavoritesPage';
import { NavbarCart } from '../Navbar/NavbarCart';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { CartProvider } from '../../contexts/cartContext';
import { FavoritesProvider } from '../../contexts/favContext';
import './App.scss';

const App = () => {
  const { pathname } = useLocation();
  const isSearchBar
    = pathname === ('/phones' || '/tablets' || '/accessories' || '/favorites');

  return (
    <div className="app">
      <FavoritesProvider>
        <CartProvider>
          <header className="app__header">
            {pathname === '/cart' ? (
              <NavbarCart />
            ) : (
              <Navbar isSearchBar={isSearchBar} />
            )}
          </header>

          <main className="app__main">
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
          </main>

          <Footer />
        </CartProvider>
      </FavoritesProvider>
    </div>
  );
};

export default App;
