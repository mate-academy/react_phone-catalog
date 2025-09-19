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

export const App = () => {
  return (
    <CartProvider>
      <FavoritesProvider>
        <main>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
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
