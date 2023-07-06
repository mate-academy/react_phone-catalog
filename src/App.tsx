import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { NotFound } from './pages/NotFound';
import { Phones } from './pages/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { getProducts } from './helpers/fetchClient';
import { Product } from './types/Product';
import { Loader } from './components/Loader/Loader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="App">
      <Header />

      {isLoading ? (<Loader />) : (
        <main className="page">
          <div className="page__container">
            <Routes>
              <Route
                path="/"
                element={<HomePage products={products} />}
              />
              <Route path="phones" element={<Phones />} />
              <Route path="tablets" element={<Tablets />} />
              <Route path="accessories" element={<Accessories />} />
              <Route path="*" element={<NotFound />} />
              <Route path="home" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};
