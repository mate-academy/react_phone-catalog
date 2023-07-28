import React, { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { getProducts } from './helpers/fetchClient';
import { Product } from './types/Product';
import { Loader } from './components/Loader/Loader';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

// import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  // const [favourites, setFavourites] = useLocalStorage('favourites', []);

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

  const { pathname } = useLocation();

  // reset scroll on changing page
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

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
              <Route
                path="phones"
                element={<PhonesPage products={products} />}
              />
              <Route
                path="phones/:productId"
                element={<ProductDetailsPage products={products} />}
              />
              <Route
                path="tablets"
                element={<TabletsPage products={products} />}
              />
              <Route
                path="tablets/:productId"
                element={<ProductDetailsPage products={products} />}
              />
              <Route
                path="accessories"
                element={<AccessoriesPage products={products} />}
              />
              <Route
                path="accessories/:ProductId"
                element={<ProductDetailsPage products={products} />}
              />
              <Route
                path="favourites"
                element={<FavouritesPage products={products} />}
              />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};
