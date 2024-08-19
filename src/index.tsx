import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './components/HomePage';
import { ProductDetailsPage } from './components/ProductDetailsPage';
import { Favorites } from './components/Favorites';
import { Cart } from './components/Cart';
import { PhonesPage } from './components/PhonesPage';
import { TabletsPage } from './components/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage';

createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}></Route>
        <Route path="phones">
          <Route index element={<PhonesPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Phones" />}
          ></Route>
        </Route>
        <Route path="tablets">
          <Route index element={<TabletsPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Tablets" />}
          ></Route>
        </Route>
        <Route path="accessories">
          <Route index element={<AccessoriesPage />}></Route>
          <Route
            path=":itemId"
            element={<ProductDetailsPage productPage="Accessories" />}
          ></Route>
        </Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="favorites" element={<Favorites />}></Route>
      </Route>

      <Route
        path="*"
        element={
          <h3 style={{ padding: 30 }} className="title">
            Page not found
          </h3>
        }
      ></Route>
    </Routes>
  </HashRouter>,
);
