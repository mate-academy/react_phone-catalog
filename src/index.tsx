import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { Catalog } from './pages/Catalog';
import { Product } from './pages/Product';
import { Favourites } from './pages/Favourites/Favourites';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="product" element={<Product />} />
        <Route path="favourites" element={<Favourites />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
