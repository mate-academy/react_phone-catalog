import './App.scss';
import { Route, Routes, useParams } from 'react-router-dom';
import { Layout } from './modules/shared/components/Layout/Layout';
import { HomePage } from './modules/HomePage';
import { CategoryPage } from './modules/CategoryPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { CartPage } from './modules/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { CATEGORIES, Category } from './types';

const CategoryPageGuard = () => {
  const { category } = useParams<{ category: string }>();

  if (!CATEGORIES.includes(category as Category)) {
    return <NotFoundPage />;
  }

  return <CategoryPage />;
};

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path=":category" element={<CategoryPageGuard />} />
      <Route path=":category/:productId" element={<ProductDetailsPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="favourites" element={<FavouritesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);
