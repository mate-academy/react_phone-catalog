import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import './styles/main.scss';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ItemPage } from './pages/ItemPage';
import { FavoritePage } from './pages/FavoritePage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { App } from './App';
import { FavoritesProvider } from './contexts/FavoritesContext';

export const Root = () => (
  <BrowserRouter>
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<CatalogPage />} />
            <Route path="23" element={<ItemPage />} />
          </Route>
          <Route path="tablets">
            <Route index element={<CatalogPage />} />
            <Route path="11" element={<ItemPage />} />
          </Route>
          <Route path="accessories">
            <Route index element={<CatalogPage />} />
            <Route path="44" element={<ItemPage />} />
          </Route>
          <Route path="favorites" element={<FavoritePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  </BrowserRouter>
);
