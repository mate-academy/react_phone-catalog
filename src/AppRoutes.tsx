import { Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ItemCardPage } from './pages/ItemCardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":itemId" element={<ItemCardPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":itemId" element={<ItemCardPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":itemId" element={<ItemCardPage />} />
        </Route>
        <Route path="cart">
          <Route index element={<CartPage />} />
        </Route>
        <Route path="favourites">
          <Route index element={<FavouritesPage />} />
          <Route path=":itemId" element={<ItemCardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
