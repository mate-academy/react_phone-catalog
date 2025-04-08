import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage';
import { HomePageCategory } from './modules/HomePageCategory';
import { DetailsPage } from './modules/DetailsPage';
import { FavouritesPage } from './modules/FavouritesPage';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import { CartPage } from './modules/CartPage';
import { CartProvider } from './components/Cart/CartContext';

export const Root = () => {
  return (
    <FavouritesProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="home" element={<Navigate to={'/'} replace />} />
              <Route path="phones" element={<HomePageCategory url="phones" />}>
                <Route
                  path=":productId"
                  element={<DetailsPage url="phones" />}
                />
              </Route>
              <Route
                path="accessories"
                element={<HomePageCategory url="accessories" />}
              >
                <Route
                  path=":productId"
                  element={<DetailsPage url="accessories" />}
                />
              </Route>
              <Route
                path="tablets"
                element={<HomePageCategory url="tablets" />}
              >
                <Route
                  path=":productId"
                  element={<DetailsPage url="tablets" />}
                />
              </Route>
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </FavouritesProvider>
  );
};
