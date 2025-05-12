import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import {
  FavouritesPageLazy,
  HomePageLazy,
  NotFoundPageLazy,
  ProductDetailsPageLazy,
  ProductPageLazy,
  ShoppingCartPageLazy,
} from './utils/lazyLoading';
import { App } from './App';
import { Suspense } from 'react';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Suspense fallback={<Loader />}>
          <Route index element={<HomePageLazy />} />

          <Route path=":productType">
            <Route index element={<ProductPageLazy />} />

            <Route path=":productId" element={<ProductDetailsPageLazy />} />
          </Route>

          <Route path="favourites" element={<FavouritesPageLazy />} />

          <Route path="cart" element={<ShoppingCartPageLazy />} />

          <Route path="*" element={<NotFoundPageLazy />} />
        </Suspense>
      </Route>
    </Routes>
  </Router>
);
