// App.tsx
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

export const App: React.FC = () => {
  const { data: products, error, isLoading } = useGetAllProductsQuery({});

  return (
    <div className="App">
      <Header />
      <ProductsProvider products={products} error={error} isLoading={isLoading}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/phones" element={<PhonesPage />} />
          <Route path="/phones/:id" element={<ProductDetailsPage />} />

          <Route path="/tablets" element={<TabletsPage />} />
          <Route path="/tablets/:id" element={<ProductDetailsPage />} />

          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/accessories/:id" element={<ProductDetailsPage />} />

          <Route
            path="*"
            element={
              <main>
                <h1 style={{ textAlign: 'center', color: 'red' }}>Not found</h1>
              </main>
            }
          />
        </Routes>
      </ProductsProvider>
      <Footer />
    </div>
  );
};
