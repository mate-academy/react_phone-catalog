import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { PageNotFound } from './Components/PageNotFound';
import { PhonesPage } from './Components/PhonesPage';
import { TabletsPage } from './Components/TabletsPage';
import { AccessoriesPage } from './Components/AccessoriesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { FavoritesPage } from './Components/FavoritesPage';
import { CartProvider } from './context/CartContext';
import { CartPage } from './Components/CartPage';
import { HomePage } from './Components/HomePage';
import { useState } from 'react';
import { ProductInfoPage } from './Components/ProductInfoPage';

export const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <CartProvider>
      <FavoritesProvider>
        <main className={isMenuOpen ? 'app app--no-scroll' : ''}>
          <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route path=":itemId" element={<ProductInfoPage />} />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route path=":itemId" element={<ProductInfoPage />} />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route path=":itemId" element={<ProductInfoPage />} />
            </Route>

            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <Footer />
        </main>
      </FavoritesProvider>
    </CartProvider>
  );
};
