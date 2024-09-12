import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { Home } from './pages/Home/Home';
import { Favorites } from './pages/Favorites/favorites';
import { Cart } from './pages/Cart/Cart';
import { Phones } from './pages/Phones/Phones';
import { Tablets } from './pages/Tablets/Tablets';
import { Accessories } from './pages/Accessories/Accessories';
import products from './api/products.json';
import { Item } from './pages/item/item';
import { ArrayProvider } from './ArrayContext';
import { NotFound } from './pages/notFound/notFound';

export const Root = () => (
  <ArrayProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="phones">
            <Route
              index
              element={
                <Phones
                  products={products.filter(
                    product => product.category === 'phones',
                  )}
                />
              }
            />
            <Route path=":itemId" element={<Item />} />
          </Route>
          <Route path="tablets" element={<Tablets />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  </ArrayProvider>
);
