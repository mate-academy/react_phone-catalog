import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { useGetAllProductsQuery } from './services/products';
import { ProductsProvider } from './contexts/ProductsContext';
import { NotFound } from './modules/NotFound';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage';

export const App: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery({});

  return (
    <div className="App">
      <ProductsProvider products={products} error={error} isLoading={isLoading}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route
            path="/phones"
            element={<CategoryPage category="phones" title="Mobile phones" />}
          />
          <Route path="/phones/:id" element={<ProductDetailsPage />} />

          <Route
            path="/tablets"
            element={<CategoryPage category="tablets" title="Tablets" />}
          />
          <Route path="/tablets/:id" element={<ProductDetailsPage />} />

          <Route
            path="/accessories"
            element={
              <CategoryPage category="accessories" title="Accessories" />
            }
          />
          <Route path="/accessories/:id" element={<ProductDetailsPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/cart" element={<CartPage />} />

          <Route path="*" element={<NotFound title="Page not found" />} />
        </Routes>
      </ProductsProvider>
      <Footer />
    </div>
  );
};
