import {
  Navigate,
  Outlet,
  Route,
  HashRouter as Router,
  Routes,
  useParams,
} from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import HomePage from './modules/HomePage/HomePage';
import NotFoundPage from './modules/NotFoundPage/NotFoundPage';
import { TypeProduct } from './types/category';
import ProductPages from './modules/ProductPages/ProductPages';
// eslint-disable-next-line max-len
import ProductDetailsPage from './modules/ProductDetailsPage/ProductDetailsPage';
import FavouritesPage from './modules/FavouritesPage/FavouritesPage';
import CartPage from './modules/CartPage/CartPage';

const ProductLayout = ({ category }: { category: TypeProduct }) => {
  const { productId } = useParams();

  return (
    <>
      {!productId && <ProductPages category={category} />}
      {productId && <Outlet />}
    </>
  );
};

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route
              path="/phones"
              element={<ProductLayout category={TypeProduct.phones} />}
            >
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route
              path="/tablets"
              element={<ProductLayout category={TypeProduct.tablets} />}
            >
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route
              path="/accessories"
              element={<ProductLayout category={TypeProduct.accessories} />}
            >
              <Route path=":productId" element={<ProductDetailsPage />} />
            </Route>
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};
