import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './App';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { ProductsProvider } from './context/ProductsContext';
import { CartPage } from './pages/CartPage';
import { FavouritesPage } from './pages/FavouritesPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';

export const Root = () => {
  return (
    <ProductsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="phones">
              <Route
                index
                element={(
                  <ProductsPage
                    type="phone"
                    title="Mobile phones"
                    linkToThisPage="Phones"
                  />
                )}
              />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="tablets">
              <Route
                index
                element={(
                  <ProductsPage
                    type="tablet"
                    title="Tablets"
                    linkToThisPage="Tablets"
                  />
                )}
              />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="accessories">
              <Route
                index
                element={(
                  <ProductsPage
                    type="accessory"
                    title="Accessories"
                    linkToThisPage="Accessories"
                  />
                )}
              />
              <Route path=":id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="cart" element={<CartPage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </ProductsProvider>
  );
};
