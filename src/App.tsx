import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Layout } from './Layout';

import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage }  from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';

import { Catalog } from './components/Catalog';
import { NotFoundPage } from './pages/NotFoundPage';

import s from './App.module.scss';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchProducts } from './features/products/productsSlice';

function App() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div className={s.loader}>Loading products...</div>;
  }

  if (error) {
    return <div className={s.error}>Error: {error}</div>;
  }

  return (
    <div className={s.appWrapper}>
      <Header />
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

            <Route path="/:category" element={<Catalog />} />
            <Route path="/:category/:productId" element={<ProductPage />} />

            <Route path="/github" element={<NotFoundPage />} />
            <Route path="/contacts" element={<NotFoundPage />} />
            <Route path="/rights" element={<NotFoundPage />} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}

export default App;
