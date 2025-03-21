import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import HomePage from './page/HomePage/HomePage';
import PhonesPage from './page/PhonesPage/PhonesPage';
import TabletsPage from './page/TabletsPage/TabletsPage';
import AccessoriesPage from './page/AccessoriesPage/AccessoriesPage';
import FavouritesPage from './page/FavouritesPage/FavouritesPage';
import CartPage from './page/CartPage/CartPage';

const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  </Router>
);

export default Root;
