import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';

export const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* <Route path="/catalog" element={<CatalogPage />} />
    <Route path="/product/:productId" element={<ProductPage />} />
    <Route path="/favourites" element={<FavouritesPage />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="*" element={<NotFoundPage />} /> */}
  </Routes>
);
