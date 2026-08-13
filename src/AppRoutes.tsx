import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './modules/HomePage/HomePage';
import { FavoritesPage } from './modules/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { useFetch } from './hooks/useFetch';
import { PRODUCTS_URL } from './api/productsApi';
import { Product } from './types/Product';
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';

export const AppRoutes = () => {
  // 1. Завантажуємо ВСІ товари за допомогою твого готового хука useFetch
  const { data, loading, error } = useFetch<Product[]>(PRODUCTS_URL);

  const safeProducts = data || [];

  // 2. Фільтруємо великий масив за категоріями
  const phones = safeProducts.filter(product => product.category === 'phones');
  const tablets = safeProducts.filter(
    product => product.category === 'tablets',
  );
  const accessories = safeProducts.filter(
    product => product.category === 'accessories',
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage products={safeProducts} />} />
      <Route path="/home" element={<Navigate to="/" replace />} />

      {/* 3. Передаємо відфільтровані масиви, статуси завантаження та помилки */}
      <Route
        path="/phones"
        element={
          <CatalogPage
            products={phones}
            title="Phones"
            loading={loading}
            error={error}
          />
        }
      />
      <Route
        path="/tablets"
        element={
          <CatalogPage
            products={tablets}
            title="Tablets"
            loading={loading}
            error={error}
          />
        }
      />
      <Route
        path="/accessories"
        element={
          <CatalogPage
            products={accessories}
            title="Accessories"
            loading={loading}
            error={error}
          />
        }
      />

      {/* Сторінки деталей товарів */}
      <Route
        path="/phones/:productId"
        element={<ProductDetailsPage allProducts={safeProducts} />}
      />
      <Route
        path="/tablets/:productId"
        element={<ProductDetailsPage allProducts={safeProducts} />}
      />
      <Route
        path="/accessories/:productId"
        element={<ProductDetailsPage allProducts={safeProducts} />}
      />

      {/* Інші сторінки */}
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
