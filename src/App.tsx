import './App.scss';
import { Routes, Route } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Footer } from './modules/shared/components/Footer';
import { CatalogPage } from './modules/CatalogPage';
import { ScrollToTop } from './modules/shared/components/ScrollToTop';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { BackToTop } from './modules/shared/components/BackToTop';
import { CartPage } from './modules/CartPage';
import { FavoritesPage } from './modules/FavoritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { HomePage } from './modules/HomePage';

export const App = () => (
  <div className="App">
    <ScrollToTop />
    <Header />

    <main className="main">
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/phones"
            element={<CatalogPage category={'phones'} title="Mobile phones" />}
          />
          <Route
            path="/tablets"
            element={<CatalogPage category={'tablets'} title="Tablets" />}
          />
          <Route
            path="/accessories"
            element={
              <CatalogPage category={'accessories'} title="Accessories" />
            }
          />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </main>

    <Footer />

    <BackToTop />
  </div>
);
