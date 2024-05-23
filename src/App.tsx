import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { CartPage } from './pages/CartPage/components/CartPage';
import { ProductPage } from './pages/ProductPage/ProductPage/ProductPage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCategories } from './types/ProductCategories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import './utils/_reset.scss';
import './App.scss';
import './styles/main.scss';
import { FavoritesPage } from './pages/FavoritesPage/components/FavoritesPage';

export const App = () => (
  <>
    <Header />

    <Routes>
      <Route path="/" index element={<HomePage />} />

      <Route
        path="/phones"
        element={<ProductPage category={ProductCategories.Phones} />}
      />
      <Route
        path="/tablets"
        element={<ProductPage category={ProductCategories.Tablets} />}
      />
      <Route
        path="/accessories"
        element={<ProductPage category={ProductCategories.Accessories} />}
      />

      <Route path="/product/:productId" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />

      <Route path="/favorites" element={<FavoritesPage />} />

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>

    <Footer />
  </>
);
