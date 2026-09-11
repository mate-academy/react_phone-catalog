import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage/AccessoriesPage';
import { ShoppingCard } from './pages/ShoppingCard/ShoppingCard';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { NotFoundPage } from './pages/NotFoundPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';

export const App = () => (
  <HashRouter>
    <FavoritesProvider>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phones" element={<PhonesPage />} />
            <Route path="/tablets" element={<TabletsPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/cart" element={<ShoppingCard />} />
            <Route path="/favorites" element={<FavouritesPage />} />
            <Route
              path="/product/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </CartProvider>
    </FavoritesProvider>
  </HashRouter>
);
