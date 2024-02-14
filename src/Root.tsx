import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductsPage } from './pages/ProductsPage/ProductsPage';

export const Root = () => {
  const productPathes = ['phones', 'tablets', 'accessories'];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          {productPathes.map((path) => (
            <Route path={path} key={path}>
              <Route index element={<ProductsPage />} />
              {/* <Route path=":itemId" element={<ProductDetailsPage />} /> */}
            </Route>
          ))}
        </Route>
      </Routes>
    </Router>
  );
};
