import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { CategoryPage } from './modules/CategoryPage';
import { HomePage } from './modules/HomePage';
import './App.scss';
import { ProductPage } from './modules/ProductPage';
import { FavouritesPage } from './modules/FavouritesPage'
import { ScrollToTop } from './components/ScrollToTop';
import { FavouritesProvider } from './context/FavouritesContext';

export const App = () => {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div className="App">
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route
                path="phones"
                element={
                  <CategoryPage category="phones" title="Mobile phones" />
                }
              />
              <Route
                path="tablets"
                element={<CategoryPage category="tablets" title="Tablets" />}
              />
              <Route
                path="accessories"
                element={
                  <CategoryPage category="accessories" title="Accessories" />
                }
              />
              <Route path=":category/:productId" element={<ProductPage />} />
              <Route path="home" element={<Navigate to="/" replace />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="*" element={<h1>Page not found</h1>} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </FavouritesProvider>
  );
};
