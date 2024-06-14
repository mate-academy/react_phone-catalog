import { App } from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Menu } from './pages/Menu/Menu';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart/Cart';
import { ProductPage } from './pages/ProductPage';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets';
import { Accessories } from './pages/Accessories';
import { Favourites } from './pages/Favourites';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="menu" element={<Menu />} />
        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":productID" element={<ProductPage />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":productID" element={<ProductPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":productID" element={<ProductPage />} />
        </Route>
        <Route path="favourites">
          <Route index element={<Favourites />} />
          <Route path=":productID" element={<ProductPage />} />
        </Route>
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  </Router>
);
