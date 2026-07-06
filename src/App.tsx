import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Cart } from './pages/Cart';
import { Favorites } from './pages/Favorites';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductPage } from './pages/ProductPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export const App = () => (
  <>
    <Header />

    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/:type" element={<ProductPage />} />

        <Route path="/:type/:id" element={<ProductDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>

    <Footer />
    {/* <h1>Product Catalog</h1> */}
  </>
);
