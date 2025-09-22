import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage';
import { AccessoriesPage } from './components/AccessoriesPage';
import { TabletsPage } from './components/TabletsPage';
import { PhonesPage } from './components/PhonesPage';
import { HomePage } from './components/HomePage';
import { App } from './App';
import { ProductDetailsPage } from './components/ProductDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<PhonesPage />}>
          <Route path=":productId?" element={<ProductDetailsPage />}></Route>
        </Route>
        <Route path="tablets" element={<TabletsPage />}>
          <Route path=":productId?" element={<ProductDetailsPage />}></Route>
        </Route>
        <Route path="accessories" element={<AccessoriesPage />}>
          <Route path=":productId?" element={<ProductDetailsPage />}></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
