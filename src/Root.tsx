/* eslint-disable react/react-in-jsx-scope */
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { MenuPage } from './pages/MenuPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/menu" element={<MenuPage />} />

        <Route path="*" element={<p>Not found page</p>} />
      </Route>
    </Routes>
  </Router>
);
