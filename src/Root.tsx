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
import { Loader } from './modules/shared/Loader';

export const Root = () => (
  <Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePageLazy />} />

          <Route path="phones">
            <Route index element={<ProductPageLazy />} />

            <Route path=":productId" element={<ProductDetailsPageLazy />} />
          </Route>

          <Route path="tablets">
            <Route index element={<ProductPageLazy />} />

            <Route path=":productId" element={<ProductDetailsPageLazy />} />
          </Route>

          <Route path="accessories">
            <Route index element={<ProductPageLazy />} />

            <Route path=":productId" element={<ProductDetailsPageLazy />} />
          </Route>

          <Route path="favourites" element={<FavouritesPageLazy />} />

          <Route path="cart" element={<ShoppingCartPageLazy />} />

          <Route path="*" element={<NotFoundPageLazy />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);
