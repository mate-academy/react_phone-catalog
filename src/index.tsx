import { createRoot } from 'react-dom/client';
import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import HomePage from './modules/HomePage';
import PhonesPage from './modules/pages/Phones';
import TabletsPage from './modules/pages/Tablets';
import AccessoriesPage from './modules/pages/Accessories';
import ProductDetailsPage from './modules/pages/ProductDetailsPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>
      </Route>
    </Routes>
  </Router>,
);
