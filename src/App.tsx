import {
  Route, Routes, useLocation, useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { HomePage } from './pages/HomePage';
import { PhoneCatalogPage } from './pages/PhoneCatalogPage';

import { TabletsPage } from './pages/TabletsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { Footer } from './componets/footer/Footer';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { Navigation } from './componets/navigation/Navigation';
import { useAppDispatch } from './app/hooks';

import {
  LOCAL_STORAGE_KEY,
  initializeFavorites,
} from './redux/reducers/favouritesReducer';
import { loadFromLocalStorage } from './utils/loadFromLocalStorage';
import {
  LOCAL_STORAGE_KEY_CART,
  initializeCart,
} from './redux/reducers/cartReducer';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RightsPage } from './pages/RightsPage';

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const getSearchPlaceholder = (route: string) => {
    if (route === '/phones') {
      return 'Search in phones...';
    }

    if (route === '/tablets') {
      return 'Search in tablets...';
    }

    if (route === '/accessories') {
      return 'Search in accessories...';
    }

    if (route === '/favourites') {
      return 'search in favourites...';
    }

    return 'Search';
  };

  useEffect(() => {
    const initialFavorites = loadFromLocalStorage(LOCAL_STORAGE_KEY);
    const initialCart = loadFromLocalStorage(LOCAL_STORAGE_KEY_CART);

    dispatch(initializeFavorites(initialFavorites));
    dispatch(initializeCart(initialCart));
  }, [dispatch]);

  return (
    <div className="page">
      <header>
        <Navigation
          searchPlaceholder={getSearchPlaceholder(location.pathname)}
        />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phones">
          <Route index element={<PhoneCatalogPage />} />
          <Route
            path=":productId"
            element={<ProductDetailsPage key={useParams().productId} />}
          />
        </Route>
        <Route path="/tablets" element={<TabletsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/rights" element={<RightsPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <div className="page__line" />
      <Footer />
    </div>
  );
};

export default App;
