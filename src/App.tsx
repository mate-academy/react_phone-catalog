import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { ProductDetailShort } from './types/ProductDetailShort';
import { useEffect, useState } from 'react';
import { ProductPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { Favorites } from './pages/Favorites/Favorites';
import { Cart } from './pages/Cart/Cart';
import { getPublicUrl } from './utils/publicUrl';

export const getPhones = async (): Promise<ProductDetailShort[]> => {
  const response = await fetch(getPublicUrl('api/products.json'));

  if (!response.ok) {
    throw new Error('Failed to load local products');
  }

  return response.json();
};

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Миттєво прокручуємо сторінку на самий верх (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // Спрацьовує щоразу, коли змінюється URL-шлях

  return null; // Компонент нічого не рендерить у DOM
};

export const App = () => {
  const [products, setProduct] = useState<ProductDetailShort[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPhones()
      .then(setProduct)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <Header />
      <main className={isLoading ? 'main' : 'main'}>
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/phones"
            element={
              <PhonesPage
                products={products}
                category="phones"
                title="Mobile phones"
              />
            }
          />
          <Route
            path="/tablets"
            element={
              <PhonesPage
                products={products}
                category="tablets"
                title="Tablets"
              />
            }
          />
          <Route
            path="/accessories"
            element={
              <PhonesPage
                products={products}
                category="accessories"
                title="Accessories"
              />
            }
          />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />

          <Route
            path="/:category/:productId"
            element={<ProductPage products_list={products} />}
          />

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};
