import {
  HashRouter as Router, Routes, Route, Navigate,
} from 'react-router-dom';

import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { Cart } from './pages/Cart/Cart';
import { Favourites } from './pages/Favourites/Favourites';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';
import { Contacts } from './pages/Contacts/Contacts';
import { Rights } from './pages/Rights/Rights';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" />} />
        <Route path="phones">
          <Route index element={<Phones />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="tablets">
          <Route index element={<Tablets />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="accessories">
          <Route index element={<Accessories />} />
          <Route path=":productId" element={<ProductPage />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="rights" element={<Rights />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </Router>
);
