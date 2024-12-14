import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Favourites } from './pages/Favourites/Favourites';
import { Cart } from './pages/Cart';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product" element={<Product />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
