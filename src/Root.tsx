import { App } from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart/Cart';
import { ProductPage } from './pages/ProductPage';
import { Favourites } from './pages/Favourites';
import { ProductProvider } from './store/ProductContext';
import { ProductsPage } from './pages/ProductsPage';
import { MenuProvider } from './store/MenuContext';

export const Root = () => (
  <Router>
    <ProductProvider>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="phones">
              <Route index element={<ProductsPage />} />
              <Route path=":productID" element={<ProductPage />} />
              <Route path="notFound" element={<NotFound />} />
            </Route>
            <Route path="tablets">
              <Route index element={<ProductsPage />} />
              <Route path=":productID" element={<ProductPage />} />
            </Route>
            <Route path="accessories">
              <Route index element={<ProductsPage />} />
              <Route path=":productID" element={<ProductPage />} />
            </Route>
            <Route path="favourites">
              <Route index element={<Favourites />} />
              <Route path=":productID" element={<ProductPage />} />
            </Route>
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </MenuProvider>
    </ProductProvider>
  </Router>
);
