import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { ContextProvider } from './store/context';
import { CatalogPage } from './pages/CatalogPage/CatalogPage';
import { ProductPage } from './pages/ProductPage';
import { FavouritePage } from './pages/FavouritePage';

export const Root = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />

            <Route path="phones">
              <Route index element={<CatalogPage type="phones" />} />
              <Route
                path=":productId"
                element={<ProductPage type="phones" />}
              />
            </Route>

            <Route path="tablets">
              <Route index element={<CatalogPage type="tablets" />} />
              <Route
                path=":productId"
                element={<ProductPage type="tablets" />}
              />
            </Route>

            <Route path="accessories">
              <Route index element={<CatalogPage type="accessories" />} />
              <Route
                path=":productId"
                element={<ProductPage type="accessories" />}
              />
            </Route>

            <Route path="favourites" element={<FavouritePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};
