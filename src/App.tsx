import { Route, Routes } from 'react-router-dom';
import './base/App.scss';
import { Suspense, useState } from 'react';
import { HomePage } from './pages/HomePage';
import { Layout } from './components/Layout';
import { Loader } from './components/Loader/Loader';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { useAppSelector } from './app/hooks';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { ProductsPage } from './pages/ProductsPage';
import { BurgerMenu } from './components/BurgerMenu';

const App = () => {
  const theme = useAppSelector(state => state.theme.value);
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  return (
    <div 
      className={`App ${theme}`}
    >
      <Layout
        setIsMenuClicked={setIsMenuClicked}
      >
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            )}
          />
          <Route path="/phones">
            <Route
              path=""
              element={(
                <Suspense fallback={<Loader />}>
                  <ProductsPage category="Phones" />
                </Suspense>
              )}
            />
            <Route
              path=":phone"
              element={(
                <Suspense fallback={<Loader />}>
                  <ProductDetailsPage />
                </Suspense>
              )}
            />
          </Route>
          <Route path="/tablets" />
          <Route path="/accessories" />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <BurgerMenu
        isMenuClicked={isMenuClicked}
        setIsMenuClicked={setIsMenuClicked}
      />
    </div>
  );
};

export default App;
