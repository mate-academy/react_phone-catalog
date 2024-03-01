import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import { Home } from './pages/Home/Home';
import { Phones } from './pages/Phones/Phones';
import { PhonesProvider } from './storage/phonesContext';
import {
  ProductDetailsPage,
} from './pages/ProductsDetailPage/ProductDetailsPage';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';
import { Favorites } from './pages/Favorites/Favorites';
import { Cart } from './pages/Cart/Cart';
import { PageNotFound } from './components/PageNotFound/PageNotFound';
import { Checkout } from './components/Checkout/Checkout';

export const Root: React.FC = () => (
  <PhonesProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="phones">
            <Route index element={<Phones />} />
            <Route path=":productId?" element={<ProductDetailsPage />} />
          </Route>
          <Route path="/tablets" element={<Tablets />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  </PhonesProvider>
);
