import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '@HomePage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path=":categoryName" element={<ProductsPage />} />
      </Route>
    </Routes>
  </Router>
);
