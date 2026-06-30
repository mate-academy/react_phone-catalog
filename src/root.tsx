import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/:category" element={<ProductsPage />}></Route>
        <Route
          path="/:category/:itemId"
          element={<ProductsDetailsPage />}
        ></Route>
      </Route>
    </Routes>
  );
};
