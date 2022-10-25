import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage }
  from './pages/ProductDetailsPage/ProductDetailsPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';
import { Product } from './types/Product';
import { getProducts } from './api/getProducts';
import { CartPage } from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { LoadingError } from './components/LoadingError';
import { ExactMatchPage } from './pages/ExactMatchPage';
import './App.scss';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    ((async () => {
      try {
        const productsFromApi = await getProducts();

        setProducts(productsFromApi);
      } catch {
        setError(true);
      }
    }))();
  }, []);

  return (
    <div className="App">
      <Header products={products} />

      {error
        ? <LoadingError />
        : (
          <>
            <main className="App__section">
              {document.readyState === 'complete'
              && (
                <Routes>
                  <Route path="/" element={<HomePage products={products} />} />
                  <Route path="/home" element={<Navigate to="/" />} />

                  <Route path="/phones" element={<PhonesPage />} />
                  <Route
                    path="/phones/:productId"
                    element={<ProductDetailsPage />}
                  />
                  <Route
                    path="/phones/:productId/:found"
                    element={<ExactMatchPage />}
                  />

                  <Route path="/tablets" element={<TabletsPage />} />
                  <Route
                    path="/tablets/:productId"
                    element={<ProductDetailsPage />}
                  />

                  <Route
                    path="/tablets/:productId/:found"
                    element={<ExactMatchPage />}
                  />
                  <Route
                    path="/accessories"
                    element={<AccessoriesPage />}
                  />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              )}
            </main>

            <Footer />
          </>
        )}
    </div>
  );
};

export default App;
