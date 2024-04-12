import './App.scss';
import {
  Navigate, Route, Routes,
} from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
// import { Footer } from './components/Footer';
import { NotFoundPage } from './pages/NotFoundPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { TabletsPage } from './pages/TabletsPage';
import { PhonesPage } from './pages/PhonesPage';
import { CartPage } from './pages/CartPage';
import { HomePage } from './pages/HomePage';
import { ContextProvider }
  from './components/ContextProviders/ContextProviders';
import { useAppSelector } from './app/hooks';
import { Footer } from './components/Footer/Footer';

const App = () => {
  // const location = useLocation();
  // const homeLocation = location.pathname.includes('cart');

  const { status }
    = useAppSelector(state => state.productDetails);

  const cart = useAppSelector(state => state.cart);

  useEffect(() => {
    const json = JSON.stringify(cart.cartItems);

    localStorage.setItem('cart', json);
  }, [cart.cartItems]);

  return (
    <div className="App">
      <ContextProvider>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/home">
              <Route index element={<HomePage />} />
              <Route
                path=":itemId"
                element={<ProductDetailsPage />}
              />
            </Route>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favorites">
              <Route index element={<FavoritesPage />} />
              <Route
                path=":itemId"
                element={<ProductDetailsPage />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/phones">
              <Route index element={<PhonesPage />} />
              <Route
                path=":itemId"
                element={<ProductDetailsPage />}
              />
            </Route>
            <Route path="/tablets">
              <Route index element={<TabletsPage />} />
              <Route
                path=":itemId"
                element={<ProductDetailsPage />}
              />
            </Route>
            <Route path="/accessories">
              <Route index element={<AccessoriesPage />} />
              <Route
                path=":itemId"
                element={<ProductDetailsPage />}
              />
            </Route>
          </Routes>
        </div>

        {status === 'succeeded' && (
          <Footer />
        )}

      </ContextProvider>
    </div>
  );
};

export default App;
