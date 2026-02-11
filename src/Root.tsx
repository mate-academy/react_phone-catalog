import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { PageNotFound } from './modules/PageNotFound/PageNotFound';
import '../src/style/fonts.scss';
import { ProductsPage } from './modules/ProductsPage/ProductsPage';

import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { ShopPage } from './modules/ShopPage/ShopPage';
import { ProductDetailsPage } from './modules/ProductDetailsPage';
import { GlobalProvider } from './provider/GlobalProvider';
import { ThemeProvider } from './provider/ThemeContextProvider';

export const Root = () => {
  return (
    <GlobalProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="shop" element={<ShopPage />} />

              <Route path="phones">
                <Route index element={<ProductsPage type="phones" />} />

                <Route
                  path=":productId"
                  element={<ProductDetailsPage type="phones" />}
                />
              </Route>

              <Route path="tablets">
                <Route element={<ProductsPage type="tablets" />} index />
                <Route
                  path=":productId"
                  element={<ProductDetailsPage type="tablets" />}
                />
              </Route>

              <Route path="accessories">
                <Route index element={<ProductsPage type="accessories" />} />
                <Route
                  path=":productId"
                  element={<ProductDetailsPage type="accessories" />}
                />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </GlobalProvider>
  );
};
