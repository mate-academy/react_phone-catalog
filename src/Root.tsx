import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';

// eslint-disable-next-line max-len
import { useProducts } from '@modules/shared/components/Context';
import { PageNotFound } from '@modules/NotFoundPage/components/PageNotFound';
import { lazy, Suspense } from 'react';
import { Loader } from '@modules/shared/components/Loader';
import categoriesData from '@public/api/categories.json';

const categories: Category[] = categoriesData;

// #region Lazy imports
const HomePage = lazy(() =>
  import('./modules/HomePage/components/HomePage/HomePage').then(module => ({
    default: module.HomePage,
  })),
);
const CategoryPage = lazy(() =>
  import('./modules/CategoryPage/components/CategoryPage/CategoryPage').then(
    module => ({
      default: module.CategoryPage,
    }),
  ),
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

  // Combine all products into a single array
  const allProducts: Product[] = [
    ...products.phones,
    ...products.tablets,
    ...products.accessories,
  ];

  return (
    <Router>
      <Suspense fallback={<Loader className="page__loader" />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />}></Route>
            <Route path="/home" element={<HomePage />}></Route>
            {categories.map(category => (
              <Route key={category.id} path={category.path}>
                <Route
                  index
                  element={
                    <CategoryPage category={category} items={allProducts} />
                  }
                ></Route>
                <Route path=":id" element={<ProductPage />}></Route>
              </Route>
            ))}
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
