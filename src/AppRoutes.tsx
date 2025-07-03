import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { FavouritesPage } from './pages/FavoritesPage';
import { PorductsList } from './components/ProductsList';
import products from './api/products.json';
import { CartPage } from './pages/CartPage';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/burger_menu" element={<App />} />
          <Route path="/favorites">
            <Route index element={<FavouritesPage />} />
          </Route>
          <Route path="/phones">
            <Route index element={<PorductsList products={products} />} />
          </Route>
          <Route path="/cart">
            <Route index element={<CartPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
