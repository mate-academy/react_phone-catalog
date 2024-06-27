import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

const linkList = [
  {
    path: 'phones',
    element: <PhonesPage />,
  },
  {
    path: 'tablets',
    element: <TabletsPage />,
  },
  {
    path: 'accessories',
    element: <AccessoriesPage />,
  },
];

export const Root = () => (
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<HomePage />} />
      <Route path="home" element={<Navigate to="/" />} />

      {linkList.map(item => (
        <Route path={item.path} key={item.path}>
          <Route index element={item.element} />
          <Route path=":productId?" element={<ProductDetailsPage />} />
        </Route>
      ))}
    </Route>
    <Route path="*" element={<h1 className="title">Page not found</h1>} />
  </Routes>
);
