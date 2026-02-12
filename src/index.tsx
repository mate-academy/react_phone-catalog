import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { HomePage } from './modules/Homepage';
import { NotFoundPage } from './modules/NotFoundPage';
import { Favourites } from './modules/Favourites';
import { Cart } from './modules/Cart';
import { Model } from './components/Model';
import { ProductNotFound } from './modules/ProductNotFound';
import { Catalog } from './components/Catalog/Catalog';
import { Category } from './components/Category/Category';

createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />
        <Route
          path="phones"
          element={<Category category="phones" title="phones" />}
        >
          <Route
            index
            element={<Catalog category="phones" title="mobilePhones" />}
          />
          <Route path=":productId" element={<Model />} />
        </Route>

        <Route
          path="tablets"
          element={<Category category="tablets" title="tablets" />}
        >
          <Route
            index
            element={<Catalog category="tablets" title="tablets" />}
          />
          <Route path=":productId" element={<Model />} />
        </Route>

        <Route
          path="accessories"
          element={<Category category="accessories" title="accessories" />}
        >
          <Route
            index
            element={<Catalog category="accessories" title="accessories" />}
          />
          <Route path=":productId" element={<Model />} />
        </Route>

        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />

        <Route path="not_found_product" element={<ProductNotFound />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
);
