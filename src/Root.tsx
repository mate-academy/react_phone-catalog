import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';

// eslint-disable-next-line max-len
import { useProducts } from './modules/shared/components/Context/ProductsContext';
import { PageNotFound } from './modules/NotFoundPage/components/PageNotFound';
import { lazy, Suspense } from 'react';
import { Loader } from './modules/shared/components/Loader';

// #region Lazy imports
const HomePage = lazy(() =>
  import('./modules/HomePage/components/HomePage/HomePage').then(module => ({
    default: module.HomePage,
  })),
);
const ItemsPage = lazy(() =>
  import('./modules/ItemsPage/components/ItemsPage/ItemsPage').then(module => ({
    default: module.ItemsPage,
  })),
);
const ProductPage = lazy(() =>
  import('./modules/ProductPage/components/ProductPage/ProductPage').then(
    module => ({ default: module.ProductPage }),
  ),
);
const Favorites = lazy(() =>
  import('./modules/Favorites/components/Favourites/Favorites').then(
    module => ({ default: module.Favorites }),
  ),
);
const Cart = lazy(() =>
  import('./modules/CartPage/components/Cart/Cart').then(module => ({
    default: module.Cart,
  })),
);
// #endregion

export const Root = ({}) => {
  const { products } = useProducts();

  return (
    <Router>
      <Suspense fallback={<Loader className="page__loader" />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            <Route path="/phones">
              <Route
                index
                element={<ItemsPage items={products.phones} />}
              ></Route>
              <Route path=":id" element={<ProductPage />}></Route>
            </Route>
            <Route path="/tablets">
              <Route
                index
                element={<ItemsPage items={products.tablets} />}
              ></Route>
              <Route path=":id" element={<ProductPage />}></Route>
            </Route>
            <Route path="/accessories">
              <Route
                index
                element={<ItemsPage items={products.accessories} />}
              ></Route>
              <Route path=":id" element={<ProductPage />}></Route>
            </Route>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
