import {
  HashRouter, Route, Routes,
} from 'react-router-dom';
import App from './App';
import { ScrollToTop } from './components/ScrollToTop';
import { ProductContextProvider } from './helpers/ProductsContext';
import { CartPage } from './pages/CartPage';
import { ErrorPage } from './pages/ErrorPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { ItemPage } from './pages/ItemPage';
import { ProductsPage } from './pages/ProductsPage';

export default function Root() {
  return (
    <ProductContextProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="phones">
              <Route
                index
                element={
                  <ProductsPage category="phones" title="Mobile phones" />
                }
              />
              <Route path=":itemId" element={<ItemPage />} />
            </Route>
            <Route path="tablets">
              <Route
                index
                element={<ProductsPage category="tablets" title="Tablets" />}
              />
              <Route path=":itemId" element={<ItemPage />} />
            </Route>
            <Route path="accessories">
              <Route
                index
                element={(
                  <ProductsPage
                    category="accessories"
                    title="Accessories"
                  />
                )}
              />
              <Route path=":itemId" element={<ItemPage />} />
            </Route>
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </ProductContextProvider>
  );
}
