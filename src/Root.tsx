import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ProductCategories } from './types';
import { HomePage, CategoryPage, ProductDetailsPage } from './pages';
import { NotFoundPage } from './ui/components';
import { App } from './App';
// import { PhonesPage } from './pages/PhonesPage';
// import { TabletsPage } from './pages/TabletsPage';
// import { AccessoriesPage } from './pages/AccessoriesPage';
// import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';
// import { CartPage } from './pages/CartPage';
// import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." />} />
        <Route path="phones">
          <Route
            index
            element={<CategoryPage category={ProductCategories.phones} />}
          />
          <Route path=":itemId" element={<ProductDetailsPage />} />
        </Route>
        <Route
          path="tablets"
          element={<CategoryPage category={ProductCategories.tablets} />}
        />
        <Route
          path="accessories"
          element={<CategoryPage category={ProductCategories.accessories} />}
        />
        {/* <Route path="favorites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
