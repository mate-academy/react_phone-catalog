import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { HomePage } from '../modules/home/HomePage';
import { PhonesPage } from '../modules/catalog/PhonesPage/PhonesPage';
import { TabletsPage } from '../modules/catalog/TabletsPage/TabletsPage';
// eslint-disable-next-line max-len
import { AccessoriesPage } from '../modules/catalog/AccessoriesPage/AccessoriesPage';
import { FavoritesPage } from '../modules/favorites/FavoritesPage';
import { CartPage } from '../modules/cart/CartPage';
// eslint-disable-next-line max-len
import { BurgerMenuPage } from '../modules/navigation/components/burgerMenu/BurgerMenuPage';
import { NotFoundPage } from '../modules/system/NotFoundPage';
import { ContactsPage } from '../modules/contacts/ContactsPage';
import { RightsPage } from '../modules/rights/RightsPage';
import { ProductDetailsPage } from '../modules/product';
import { ProductsProvider } from '../shared/context/ProductsContext';
import { ScrollToTop } from '../shared/ui/scrollToTop/ScrollToTop';
// eslint-disable-next-line max-len
import { ProductDetailsProvider } from '../shared/context/ProductDetailsContext';
import { CartProvider } from '../shared/context/CartContext';

export const Root = () => (
  <Router>
    <ScrollToTop />
    <ProductsProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="phones">
              <Route index element={<PhonesPage />} />
              <Route
                path=":productId"
                element={
                  <ProductDetailsProvider>
                    <ProductDetailsPage />
                  </ProductDetailsProvider>
                }
              />
            </Route>

            <Route path="tablets">
              <Route index element={<TabletsPage />} />
              <Route
                path=":productId"
                element={
                  <ProductDetailsProvider>
                    <ProductDetailsPage />
                  </ProductDetailsProvider>
                }
              />
            </Route>

            <Route path="accessories">
              <Route index element={<AccessoriesPage />} />
              <Route
                path=":productId"
                element={
                  <ProductDetailsProvider>
                    <ProductDetailsPage />
                  </ProductDetailsProvider>
                }
              />
            </Route>

            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="burgerMenu" element={<BurgerMenuPage />} />

            <Route path="contacts" element={<ContactsPage />} />
            <Route path="rights" element={<RightsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </ProductsProvider>
  </Router>
);
