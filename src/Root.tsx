import {
  // HashRouter as Router,
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { NotFound } from './pages/NotFound';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Category } from './types/Category';
import { FavouritePage } from './pages/Favourites';
import { CartPage } from './pages/Cart';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />

        <Route path="phones">
          <Route index element={<Products category={Category.Phones} />} />
          <Route
            path=":productId"
            element={<Products category={Category.Phones} />}
          />
        </Route>
        <Route path="tablets">
          <Route index element={<Products category={Category.Tablets} />} />
          <Route
            path=":productId"
            element={<Products category={Category.Tablets} />}
          />
        </Route>
        <Route path="accessories">
          <Route index element={<Products category={Category.Accessories} />} />
          <Route
            path=":productId"
            element={<Products category={Category.Accessories} />}
          />
        </Route>

        <Route path="favourites" element={<FavouritePage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);
