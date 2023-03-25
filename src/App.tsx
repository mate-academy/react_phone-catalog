import './styles/reset.scss';
import './App.scss';

import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { ProductDetails } from './pages/ProductDetails';
import { TabletsPage } from './pages/Tabletspage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { NotFound } from './pages/NotFound';

import { getProducts } from './helpers/getProducts';
import { Product } from './type/product';

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setProductsList = () => {
    setIsLoading(true);

    getProducts()
      .then(data => setProducts(data))
      .finally(() => setIsLoading(false));
  };

  const pageUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setProductsList();
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="home"
            element={<Navigate to="/" />}
          />

          <Route
            path="/"
            element={
              <HomePage isLoading={isLoading} products={products} />
            }
          />

          <Route path="/phones">
            <Route index element={<PhonesPage />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route path="/tablets">
            <Route index element={<TabletsPage />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route path="/accessories">
            <Route index element={<AccessoriesPage />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route path="/favourites">
            <Route index element={<FavouritesPage />} />
            <Route
              path=":productId"
              element={<ProductDetails products={products} />}
            />
          </Route>

          <Route
            path="/cart"
            element={<CartPage />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <Footer pageUp={pageUp} />
    </div>
  );
};

export default App;
