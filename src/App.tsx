import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductPage } from './pages/ProductPage/Products/ProductPage';
import { ProductCategories } from './types/ProductCategories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import './App.scss';
import './styles/main.scss';
import './utils/_reset.scss';
import { CartPage } from './pages/CartPage/components/CartPage';

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

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
    <Footer />
  </>
);
