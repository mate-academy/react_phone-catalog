import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { useMyContext } from './context/context';
import { FavoritesPage } from './pages/FavoritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ErrorMessage } from './components/ErrorMessage';

export const App = () => {
  const { error } = useMyContext();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={(
            <HomePage />
          )}
        />
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/phones">
          <Route index element={<PhonesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="/tablets">
          <Route index element={<TabletsPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route path="/accessories">
          <Route index element={<AccessoriesPage />} />
          <Route path=":productId" element={<ProductDetailsPage />} />
        </Route>

        <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/*"
          element={(
            <div className="page">
              <h1 className="page__title h1">
                Page not found
              </h1>
            </div>
          )}
        />
      </Routes>

      {error && <ErrorMessage />}

      <Footer />

    </div>
  );
};
