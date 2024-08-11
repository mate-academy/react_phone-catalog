import { App } from './App';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';
import { CartPage } from './Pages/CartPage/CartPage';
import { PhonesPage } from './Pages/PhonesPage/PhonesPage';
import { TabletsPage } from './Pages/TabletsPage/TabletsPage';
import { AccessoriesPage } from './Pages/Accessories/Accessories';
// eslint-disable-next-line
import { ProductDetailsPage } from './Pages/ProductDetailsPage/ProductDetailsPage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId?" element={<ProductDetailsPage />} />
        </Route>

        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);
