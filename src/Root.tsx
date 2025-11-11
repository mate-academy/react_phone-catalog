import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from '@HomePage';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';
import { ScrollTop } from './utils/ScrollTop';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductCard } from './modules/ProductCard/ProductCard';

export const Root = () => (
  <Router>
    <ScrollTop />

    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<ProductsPage />} />
          <Route path=":productId?" element={<ProductCard />} />
        </Route>

        <Route path="tablets" element={<ProductsPage />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId?" element={<ProductCard />} />
        </Route>
        <Route path="accessories" element={<ProductsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </Router>
);
