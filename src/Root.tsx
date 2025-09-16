import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './app/App';
import { HomePage, NotFoundPage, CategoriesPage, ProductPage } from './pages';
import { Category } from '@shared/types/APIReturnTypes';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {Object.values(Category).map(cat => (
          <Route
            key={cat}
            path={`/${cat}`}
            element={<CategoriesPage category={cat} />}
          />
        ))}
        <Route path="/product/:productId" element={<ProductPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
