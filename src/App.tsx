import { FC, useEffect } from 'react';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';

import { Header } from './pages/components/Header';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { Footer } from './pages/components/Footer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { useAppDispatch } from './app/hooks';
import { incrementAsync as loadedPhones } from './features/phones/phonesSlice';

export const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadedPhones());
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
        <Route
          path="*"
          element={<h1 className="title">Page not found</h1>}
        />
      </Routes>
    </div>
  );
};
