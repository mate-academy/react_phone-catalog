import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './shared/Header';
import { Footer } from './shared/Footer';
import { HomePage } from './modules/HomePage';
import { PhonesPage } from './modules/PhonesPage/PhonesPage';
import { TabletsPage } from './modules/TabletsPage';
import { AccessoriesPage } from './modules/AccessoriesPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { useGetAllProductsQuery } from './services/products';
import { ProductsProvider } from './contexts/ProductsContext';
import { NotFound } from './shared/NotFound';
import { FavoritesPage } from './modules/FavoritesPage';

export const App: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery({});

  return (
    <div className="App">
      <ProductsProvider products={products} error={error} isLoading={isLoading}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:id" element={<ProductDetailsPage />} />

          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:id" element={<ProductDetailsPage />} />

          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:id" element={<ProductDetailsPage />} />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="*" element={<NotFound title="Page not found" />} />
        </Routes>
      </ProductsProvider>
      <Footer />
    </div>
  );
};
