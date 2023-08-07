import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Homepage } from './pages/Homepage';
import {
  ProductDetailsPage,
} from './components/ProductDetails/ProductDetailsPage';
import { API_URL, getProducts } from './helpers/helper';
import './App.scss';
import { Favoutires } from './components/Favourites/Favourites';
import { Cart } from './components/Cart/Cart';
import { ScrollToTop } from './helpers/ScrollToTop';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import {
  AccessoriesPage,
} from './pages/AccessoriesPage';
import { NotFound } from './components/NotFound/NotFound';
import { useAppDispatch } from './app/hooks';
import { set } from './features/productsSlice';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProducts(API_URL);

        dispatch(set(response));
      } catch (fetchError) {
        throw new Error('Data could not be fetched');
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <ScrollToTop />
      <div className="wrapper">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Homepage />}
          />
          <Route path="phones">
            <Route index element={<PhonesPage />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path="tablets">
            <Route index element={<TabletsPage />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route path="accessories">
            <Route index element={<AccessoriesPage />} />
            <Route
              path=":productId"
              element={<ProductDetailsPage />}
            />
          </Route>
          <Route
            path="favourites"
            element={<Favoutires />}
          />
          <Route
            path="cart"
            element={<Cart />}
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="home"
            element={<Navigate to="/" replace />}
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
