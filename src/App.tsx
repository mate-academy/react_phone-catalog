import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getProductsAsync } from './features/getProductsSlice';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { FavouritesPage } from './components/FavouritesPage';
import { GeneralProductsPage } from './components/GeneralProductPage';
import { ItemInformation } from './components/ItemInformation';
import { BucketPage } from './components/BucketPage';
import { BurgerMenu } from './components/BurgerMenu';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

export const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  useEffect(() => {
    setIsMenuOpen(location.pathname === '/menu');
  }, [location.pathname]);

  return (
    <>
      <div className="App">
        <div className="page-content">
          <header className="header">
            <Header />
          </header>

          <main className="main">
            <CSSTransition
              in={isMenuOpen}
              timeout={300}
              classNames="fade"
              unmountOnExit
            >
              <BurgerMenu />
            </CSSTransition>

            {!isMenuOpen && (
              <SwitchTransition mode="out-in">
                <CSSTransition
                  key={location.pathname}
                  timeout={300}
                  classNames="fade"
                  unmountOnExit
                >
                  <Routes location={location}>
                    <Route path="/">
                      <Route index element={<HomePage />} />
                    </Route>
                    <Route
                      path="home"
                      element={<Navigate to="/" replace={true} />}
                    />
                    <Route path="phones">
                      <Route index element={<GeneralProductsPage />} />
                      <Route path=":productId?" element={<ItemInformation />} />
                    </Route>
                    <Route path="tablets">
                      <Route index element={<GeneralProductsPage />} />
                      <Route path=":productId?" element={<ItemInformation />} />
                    </Route>
                    <Route path="accessories">
                      <Route index element={<GeneralProductsPage />} />
                      <Route path=":productId?" element={<ItemInformation />} />
                    </Route>
                    <Route path="favourites" element={<FavouritesPage />} />
                    <Route path="bucket" element={<BucketPage />} />
                    <Route path="*" element={<p>Page not found</p>} />
                  </Routes>
                </CSSTransition>
              </SwitchTransition>
            )}
          </main>

          {!isMenuOpen && (
            <footer className="footer">
              <Footer />
            </footer>
          )}
        </div>
      </div>
    </>
  );
};
