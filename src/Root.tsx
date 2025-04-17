import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { App } from './App';
import { HomePage } from './pages/Home/HomePage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';
import { HomeRedirect } from './pages/Home/HomeRedirect';
import { PhonesPage } from './pages/Phones/PhonesPage';
import { ProductDetailsPage } from './pages/ProductDetails/ProductDetailsPage';
import { TabletsPage } from './pages/Tablets/TabletsPage';
import { AccessoriesPage } from './pages/Accessories/AccessoriesPage';
import { FavouritesPage } from './pages/Favourites/FavouritesPage';
import { ProductsSwiperProvider } from './context/ProductsSwiperContext';
import { ProductDetailsProvider } from './context/ProductDetailsContext';
import { ProductProvider } from './context/ProductContext';

export const Root = () => (
  <Router>
    <ProductProvider>
      <ProductsSwiperProvider>
        <ProductDetailsProvider>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />}></Route>
              <Route path="home" element={<HomeRedirect />}></Route>
              <Route path="phones" element={<PhonesPage />}>
                <Route path=":itemId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="tablets" element={<TabletsPage />}>
                <Route path=":itemId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="accessories" element={<AccessoriesPage />}>
                <Route path=":itemId" element={<ProductDetailsPage />} />
              </Route>
              <Route path="favourites" element={<FavouritesPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </ProductDetailsProvider>
      </ProductsSwiperProvider>
    </ProductProvider>
  </Router>
);
