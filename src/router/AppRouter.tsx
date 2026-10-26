import { Navigate, Route, Routes } from 'react-router-dom';

import { App } from '../App';
import { HomePage } from '../pages/HomePage/HomePage';
import { CategoryPage } from '../pages/CategoryPage/CategoryPage';
import { ProductPage } from '../pages/ProductPage/ProductPage';
import { FavoritesPage } from 'src/pages/FavouritesPage/FavouritesPage';
import { CartPage } from 'src/pages/CartPage/CartPage';
import { useStoreContext } from 'src/context/StoreContext';
import { EmptyState } from 'src/components/EmptyState/EmptyState';

export const AppRouter = () => {
  const { products } = useStoreContext();

  const phones = products.filter(product => product.category === 'phones');

  const tablets = products.filter(product => product.category === 'tablets');

  const accessories = products.filter(
    product => product.category === 'accessories',
  );

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route
          path="phones"
          element={<CategoryPage products={phones} title="Mobile phones" />}
        />
        <Route
          path="tablets"
          element={<CategoryPage products={tablets} title="Tablets" />}
        />
        <Route
          path="accessories"
          element={<CategoryPage products={accessories} title="Accessories" />}
        />
        <Route path=":category/:itemId" element={<ProductPage />} />
        <Route path="favourites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<EmptyState type="error" />} />
      </Route>
    </Routes>
  );
};
