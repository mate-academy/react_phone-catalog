import { Route, Routes } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CartPage from './pages/CartPage/CartPage';
import CardPage from './pages/CardPage/CardPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { Layout } from './layouts/Layout';

export const App = () => {
  return (
    <Layout>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:catalog" element={<CatalogPage />} />
          <Route path="/:catalog/:id" element={<CardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Layout>
  );
};
