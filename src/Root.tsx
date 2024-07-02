import {
  HashRouter as Router,
  // BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { FavouritePage } from './pages/Favourites';
import { CartPage } from './pages/Cart';
import { ProductDetails } from './pages/ProductDetails';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path=":category">
          <Route index element={<Products />} />
          <Route path=":productId" element={<ProductDetails />} />
        </Route>

        <Route path="favourites" element={<FavouritePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
