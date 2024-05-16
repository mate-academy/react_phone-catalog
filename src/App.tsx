import { Route, Routes } from 'react-router-dom';
import './App.scss';
import './utils/_reset.scss';
import { HomePage } from './pages/HomePage/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductPage } from './pages/ProductPage/Products/ProductPage';
import { ProductCategories } from './types/ProductCategories';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const App = () => (
  <>
    <Header />

    <Routes>
      <Route path="/" index element={<HomePage />} />

      <Route
        path="/phones"
        index
        element={<ProductPage category={ProductCategories.Phones} />}
      />
      <Route
        path="/tablets"
        index
        element={<ProductPage category={ProductCategories.Tablets} />}
      />
      <Route
        path="/accessories"
        index
        element={<ProductPage category={ProductCategories.Accessories} />}
      />

      <Route path="/product/:productId" element={<ProductDetailsPage />} />

      <Route path="*" element={<p>Page not found</p>} />
    </Routes>
    <Footer />
  </>
);
