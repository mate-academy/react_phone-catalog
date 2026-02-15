import {
  HashRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';
import { CartsPage } from './pages/CartsPage/CartsPage';
import { ThemeProvider } from './hooks/useTheme';
import { ProductsProvider } from './hooks/savedProducts';
import { FavouritesPage } from './pages/FavouritePage/FavouritePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { availableCategories } from './constants/availableCategories';
import { ProductInfoPage } from './pages/ProductsInfoPage';
import { ErrorHandlingProvider } from './hooks/errorHandling';

const CategoryRoutes = () => {
  const { category } = useParams();

  if (!category || !availableCategories.includes(category)) {
    return <NotFoundPage />;
  }

  return (
    <Routes>
      <Route index element={<ProductsPage />} />
      <Route path=":productId" element={<ProductInfoPage />} />
      <Route path=":productId/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export const Root = () => {
  return (
    <ErrorHandlingProvider>
      <ThemeProvider>
        <ProductsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<HomePage />} />
                <Route path=":category/*" element={<CategoryRoutes />} />
                <Route path="favourites" element={<FavouritesPage />} />
                <Route path="cart" element={<CartsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </ProductsProvider>
      </ThemeProvider>
    </ErrorHandlingProvider>
  );
};
