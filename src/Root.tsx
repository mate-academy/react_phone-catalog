import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { Category } from './enums/Category';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { NotFoundPage } from './pages/NotFountPage';

const linkList = [
  {
    path: 'phones',
    element: <PhonesPage />,
    type: Category.phones,
  },
  {
    path: 'tablets',
    element: <TabletsPage />,
    type: Category.tablets,
  },
  {
    path: 'accessories',
    element: <AccessoriesPage />,
    type: Category.accessories,
  },
];

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="cart" element={<CartPage />} />
      {linkList.map(item => (
        <Route path={item.path} key={item.path}>
          <Route index element={item.element} />
          <Route
            path=":productId?"
            element={<ProductDetailsPage type={item.type} />}
          />
        </Route>
      ))}
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
