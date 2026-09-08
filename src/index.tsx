import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './Pages/HomePage';
import { Catalog } from './Pages/Catalog';
import { Product } from './Pages/Product';
import { Favourites } from './Pages/Favourites';
import { Cart } from './Pages/Cart';
import { Category } from './types/CategoryType';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <HashRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones" element={<Catalog category={Category.Phones} />} />
        <Route
          path="accessories"
          element={<Catalog category={Category.Accessories} />}
        />
        <Route
          path="tablets"
          element={<Catalog category={Category.Tablets} />}
        />
        <Route path="product/:id" element={<Product />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </HashRouter>,
);
