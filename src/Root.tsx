import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { ProductPage } from './modules/ProductPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { FavouritesPage } from './modules/FavouritesPage/FavouritesPage';
import { CartPage } from './modules/CartPage';
import { NotFoundPage } from './modules/NotFoundPage';
import { availableCategories } from './constantas/availableCategories';
import { MenuProvider } from './hooks/useMenu';

const CategoryRoutes = () => {
  const { category } = useParams();

  if (!category || !availableCategories.includes(category)) {
    return <NotFoundPage />;
  }

  return (
    <Routes>
      <Route index element={<ProductPage />} />
      <Route path=":productId" element={<ProductDetailsPage />} />
      <Route path=":productId/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const Root = () => (
  <MenuProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":category/*" element={<CategoryRoutes />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="home" element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </Router>
  </MenuProvider>
);
