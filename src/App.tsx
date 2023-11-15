import { FC, useEffect } from 'react';
import {
  Navigate, Route, Routes, useLocation,
} from 'react-router-dom';
import './App.scss';

import { Header } from './pages/components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Footer } from './pages/components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { incrementAsync as loadedPhones } from './features/phones/phonesSlice';
import { FavoritesPage } from './pages/FavoritesPage';
import { CardPage } from './pages/CardPage';
import { TabletsPage } from './pages/TabletsPage';
import {
  incrementAsync as loadedProducts,
} from './features/products/productsSlice';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { searchBarSelector } from './app/selector';
import { unsetSearchingValue } from './features/SearchBar/searchBarSlice';

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const locationPathName = useLocation().pathname;
  const searchBarValue = useAppSelector(searchBarSelector);

  useEffect(() => {
    if (searchBarValue) {
      dispatch(unsetSearchingValue());
    }
  }, [locationPathName]);

  useEffect(() => {
    dispatch(loadedPhones());
    dispatch(loadedProducts());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header />
              <HomePage />
              <Footer />
            </>
          )}
        />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="phones">
          <Route
            index
            element={(
              <>
                <Header />
                <PhonesPage />
                <Footer />
              </>
            )}
          />
          <Route
            path="/phones/:productId"
            element={(
              <>
                <Header />
                <ProductDetailsPage />
                <Footer />
              </>
            )}
          />
        </Route>
        <Route path="tablets">
          <Route
            index
            element={(
              <>
                <Header />
                <TabletsPage />
                <Footer />
              </>
            )}
          />
          <Route
            path="/tablets/:productId"
            element={(
              <>
                <Header />
                <ProductDetailsPage />
                <Footer />
              </>
            )}
          />
        </Route>
        <Route path="accessories">
          <Route
            index
            element={(
              <>
                <Header />
                <AccessoriesPage />
                <Footer />
              </>
            )}
          />
          <Route
            path="/accessories/:productId"
            element={(
              <>
                <Header />
                <ProductDetailsPage />
                <Footer />
              </>
            )}
          />
        </Route>
        <Route
          path="favorites"
          element={(
            <>
              <Header />
              <FavoritesPage />
              <Footer />
            </>
          )}
        />
        <Route
          path="card"
          element={(
            <>
              <Header />
              <CardPage />
              <Footer />
            </>
          )}
        />
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
    </div>
  );
};
