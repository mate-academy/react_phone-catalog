import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { HomePage } from './modules/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { Header } from './modules/shared/components/Header/Header';
import { Footer } from './modules/shared/components/Footer/Footer';
import { CatalogPage } from './modules/CatalogPage';
import { useProductsContext } from './hook/useProductsContext';

export const App = () => {
  const { products } = useProductsContext();

  const phones = products.filter(product => {
    return product.category === 'phones';
  });
  const tablets = products.filter(product => {
    return product.category === 'tablets';
  });
  const accessories = products.filter(product => {
    return product.category === 'accessories';
  });

  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/phones"
            element={
              <CatalogPage
                products={phones}
                category={'Phones'}
                title={'Phones page'}
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <CatalogPage
                products={tablets}
                category={'Tablets'}
                title={'Tablets page'}
              />
            }
          />

          <Route
            path="/accessories"
            element={
              <CatalogPage
                products={accessories}
                category={'Accessories'}
                title={'Accessories page'}
              />
            }
          />

          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />

          <Route path="/product/:productId" element={<ProductDetailsPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};
