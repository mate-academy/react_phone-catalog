import { Route, Routes } from 'react-router-dom';
import { HomePage } from './components/HomePage/HomePage';
import { PhonesPage } from './components/PhonesPage/PhonesPage';
import { ProductDetailsPage }
  from './components/ProductDetailsPage/ProductDetailsPage';
import { FavouritesPage } from './components/FavouritesPage/FavouritesPage';
import { CartPage } from './components/CartPage/CartPage';
import { FavouritesProvider } from './FavContext';
import { CartProvider } from './CartContext';
import { TabletsPage } from './components/TabletsPage/TabletsPage';
import { AccessoriesPage } from './components/AccessoriesPage/AccessoriesPage';
import { Checkout } from './components/Checkout/Checkout';
import './App.scss';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export const App: React.FC = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <div className="App">
          <Routes>
            <Route
              path="*"
              element={<NotFoundPage />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route path="/phones">
              <Route
                index
                path="/phones"
                element={<PhonesPage />}
              />
              <Route
                path="/phones/:productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="/tablets">
              <Route
                index
                path="/tablets"
                element={<TabletsPage />}
              />
              <Route
                path="/tablets/:productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route path="/accessories">
              <Route
                index
                path="/accessories"
                element={<AccessoriesPage />}
              />
              <Route
                path="/accessories/:productId"
                element={<ProductDetailsPage />}
              />
            </Route>

            <Route
              path="/favourites"
              element={<FavouritesPage />}
            />

            <Route
              path="/cart"
              element={<CartPage />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />
          </Routes>
        </div>
      </CartProvider>
    </FavouritesProvider>
  );
};
