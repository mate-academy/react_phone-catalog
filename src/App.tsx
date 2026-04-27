import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

// Імпортуємо компоненти (React автоматично шукає index.ts у папках)
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Layout } from './Layout'; // якщо Layout теж папка з index.ts, то так

// Імпортуємо сторінки
import { Home } from './pages/Home';
import { ProductPage } from './pages/ProductPage';
import { CartPage }  from './pages/CartPage';
import { FavoritesPage } from './pages/FavoritesPage';

// Для Catalog ми використовуємо іменований імпорт, бо там 2 компоненти
import { Catalog } from './components/Catalog';

// Стилі
import s from './App.module.scss';

// Redux
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

            {/* Маршрути категорій */}
            <Route path="/:category" element={<Catalog />} />
            <Route path="/:category/:productId" element={<ProductPage />} />
          </Routes>
        </Layout>
      </main>
      <Footer />
    </div>
  );
}

export default App;
