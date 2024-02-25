/* eslint-disable */
import {
  HashRouter,
  Route,
  Routes,
  // Navigate,
} from 'react-router-dom';
import { App } from './App';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { HomePage } from './pages/home/HomePage';
import { AppContextProvider } from './AppContext';
import { PageNotFound } from './pages/NotFound/PageNotFound';
import { ProductCard } from './components/product/ProductCard';
import { FafouritesPage } from './pages/FavouritesPage/FavouritesPage';
import { CartPage } from './pages/CartPage/CartPage';

export const Root = () => (
  <HashRouter>
    <AppContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="phones">
            <Route index element={<ProductPage />} />
            <Route path=":productId?" element={<ProductCard />} />
          </Route>
          <Route path="tablets">
            <Route index element={<ProductPage />} />
            <Route path=":productId?" element={<ProductCard />} />
          </Route>
          <Route path="favourites" element={<FafouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </AppContextProvider>
  </HashRouter>
);
