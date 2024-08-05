import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { ProductProvider } from './helper/ProductContext';
import { PhonePage } from './pages/ProductPages/PhonePage';
import { NoResults } from './Components/NoResults/NoResults';
import { TabletsPage } from './pages/ProductPages/TabletsPage';
import { AccessoriesPage } from './pages/ProductPages/AccessoriesPage';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './pages/ProductDetailsPage/ProductDetailsPage';
import { CartPage } from './pages/CartPage/CartPage';
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage';
import { MenuPage } from './pages/MenuPage/MenuPage';

export const Root = () => (
  <ProductProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/phones" element={<PhonePage />}>
            <Route index element={<PhonePage />} />
            <Route path=":page" element={<PhonePage />} />
          </Route>
          <Route path="/tablets/:page?" element={<TabletsPage />}>
            <Route index element={<TabletsPage />} />
            <Route path=":page" element={<TabletsPage />} />
          </Route>
          <Route path="/accessories/:page?" element={<AccessoriesPage />}>
            <Route index element={<TabletsPage />} />
            <Route path=":page" element={<TabletsPage />} />
          </Route>
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="*" element={<NoResults />} />
        </Route>
      </Routes>
    </Router>
  </ProductProvider>
);
