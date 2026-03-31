import { Routes, Route } from 'react-router-dom';
import { Layout } from './modules/components/Layout';
import { HomePage } from './modules/pages/HomePage';
import { CatalogPage } from './modules/pages/CatalogPage';
import { ProductDetailsPage } from './modules/pages/ProductDetailsPage';
import { CartPage } from './modules/pages/CartPage';
import { FavouritesPage } from './modules/pages/FavouritesPage';
import { NotFoundPage } from './modules/pages/NotFoundPage';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/:category" element={<CatalogPage />} />
        <Route path="/:category/:productId" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
