import { Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/:category" element={<ProductsPage />}></Route>
      </Route>
    </Routes>
  );
};
