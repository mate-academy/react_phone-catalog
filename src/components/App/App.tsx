import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { HomePage } from '../../Routes/HomePage/HomePage';
import { Footer } from '../Footer/Footer';
import { PhonesPage } from '../../Routes/PhonesPage/PhonesPage';
import { TabletsPage } from '../../Routes/TabletsPage/TabletsPage';
import { AccessoriesPage } from '../../Routes/AccessoriesPage/AccessoriesPage';
import { ProductDetailsPage } from '../../Routes/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from '../../Routes/CartPage/CartPage';
import { FavoritesPage } from '../../Routes/FavoritesPage/FavoritesPage';
import { CartProvider } from '../../contexts/cartContext';
import { NavbarCart } from '../Navbar/NavbarCart';
import { Navbar } from '../Navbar/Navbar';
import './App.scss';

const App = () => {
  const { pathname } = useLocation();
  const isSearchBar =
    pathname === ('/phones' || '/tablets' || '/accessories' || '/favorites');

  return (
    <div className="app">
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
    </div>
  );
};

export default App;
