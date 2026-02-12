import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage';
import AccessoriesPage from './pages/AccessoriesPage';
import PhonesPage from './pages/PhonesPage';
import TabletsPage from './pages/TabletsPage';
import NotFoundPage from './pages/NotFoundPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import ProductDetailsPage from './pages/ProductDetailsPage';

export const App = () => (
  <div className="App">
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/phones" element={<PhonesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/phones/:id" element={<ProductDetailsPage />} />
        <Route path="/tablets/:id" element={<ProductDetailsPage />} />
        <Route path="/accessories/:id" element={<ProductDetailsPage />} />
      </Routes>
    </HashRouter>
  </div>
);
