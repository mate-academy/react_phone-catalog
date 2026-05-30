import { Route, Routes } from 'react-router-dom';
import './App.scss';
import './styles/grid.scss';
import { Catalog } from './components/Catalog/Catalog/Catalog';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header/Header';
import { HomePage } from './components/HomePage/HomePage/HomePage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { ProductPage } from './components/ProductPage/ProductPage';
import { CartPage } from './components/CartPage/CartPage';
import { CartProvider } from './context/CartContext';
import { Favorites } from './components/Favorites/Favorites';
import { FavouritesProvider } from './context/FavoritesContext';

export const App = () => (
  <FavouritesProvider>
    <CartProvider>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<Catalog />} />
            <Route path="/tablets" element={<Catalog />} />
            <Route path="/accessories" element={<Catalog />} />
            <Route path="/phones/:itemId" element={<ProductPage />} />
            <Route path="/tablets/:itemId" element={<ProductPage />} />
            <Route path="/accessories/:itemId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  </FavouritesProvider>
);
