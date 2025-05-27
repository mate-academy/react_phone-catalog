import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage/AccessoriesPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { GlobalProvider } from './app/store/GlobalContext';
import { Cart } from './modules/CartPage/Cart';
import { Favorites } from './modules/FavoritesPage';
import { ItemCard } from './modules/shared/ItemCard';

export const Root = () => {
  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="phones" element={<PhonesPage />} />
            <Route path="phones/:itemId" element={<ItemCard />} />
            <Route path="tablets/:itemId" element={<ItemCard />} />
            <Route path="accessories/:itemId" element={<ItemCard />} />
            <Route path="tablets" element={<TabletsPage />} />
            <Route path="accessories" element={<AccessoriesPage />} />
            <Route path="cart" element={<Cart />}>
              <Route path=":itemId" element={<ItemCard />} />
            </Route>
            <Route path="favorites" element={<Favorites />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
};
