import { App } from './App';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Menu } from './pages/Menu/Menu';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart/Cart';
import { ProductPage } from './pages/ProductPage';
// import { Accessories } from './pages/Accessories';
import { Favourites } from './pages/Favourites';
import { ProductProvider } from './store/ProductContext';
import { ProductsPage } from './pages/ProductsPage';

export const Root = () => (
  <Router>
    <ProductProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="menu" element={<Menu />} />
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
    </ProductProvider>
  </Router>
);
