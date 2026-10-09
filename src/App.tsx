import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/Header/Header';
import './style/GlobalStyle.scss';
import { HomePage } from './modules/HomePage/HomePage';
import { FavoritesPage } from './modules/FavoritesPage/FavoritesPage';
import { CartPage } from './modules/CartPage/CartPage';
import { Footer } from './modules/shared/Footer/Footer';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ScrollToTop } from './app/ScrollToTop';
import { useEffect } from 'react';
import { fetchProducts } from './features/productsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Loader } from './app/Loader/Loader';
// eslint-disable-next-line max-len
import { ProductDetailsPage } from './modules/ProductDetailsPage/ProductDetailsPage';

export const App = () => {
  const dispatch = useAppDispatch();
  const { items, loading, hasError } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  if (loading && items.length === 0) {
    return (
      <div className="page container">
        <Loader />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="page container error-block">
        <p>Something went wrong</p>
        <button
          type="button"
          className="button-standart"
          onClick={() => dispatch(fetchProducts())}
        >
          Reload
        </button>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <div className="page has-navbar-fixed-top">
        <Header />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route
              path="/phones"
              element={<CatalogPage category="phones" title="Phones" />}
            />
            <Route
              path="/tablets"
              element={<CatalogPage category="tablets" title="Tablets" />}
            />
            <Route
              path="/accessories"
              element={
                <CatalogPage category="accessories" title="Accessories" />
              }
            />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/:category/:productId"
              element={<ProductDetailsPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};
