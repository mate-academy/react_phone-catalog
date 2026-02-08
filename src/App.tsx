import './App.scss';
import { Footer } from './modules/shared/Footer';
import { Header } from './modules/shared/Header';
import { HomePage } from './modules/HomePage';
import { Route, Routes } from 'react-router-dom';
import { CartPage } from './modules/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { ProductsPages } from './modules/ProductsPages';
import { NotFoundPage } from './modules/NotFoundPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export default function App() {
  return (
    <>
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/phones" element={<ProductsPages />} />
          <Route path="/phones/:id" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<ProductsPages />} />
          <Route path="/tablets/:id" element={<ProductDetailsPage />} />
          <Route path="/accessories" element={<ProductsPages />} />
          <Route path="/accessories/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
