import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import { HomePage } from './components/HomePage/HomePage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { getProductsAsync } from './features/getProductsSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import { FavouritesPage } from './components/FavouritesPage';
import { GeneralProductsPage } from './components/GeneralProductPage';
import { ItemInformation } from './components/ItemInformation';
import { BucketPage } from './components/BucketPage';
import { BurgerMenu } from './components/BurgerMenu';

export const App = () => {
  // const category  = useLocation().pathname.slice(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

  const isMenuClicked = useLocation().pathname.slice(1);

  return (
    <>
      <div className="App">
        <div className="page-content">
          <header className="header">
            <Header />
          </header>

          <main className="main">
            <Routes>
              <Route path="/">
                <Route index element={<HomePage />} />
                {/* <Route path=":productId?" element={<ItemInformation />} /> */}
              </Route>
              <Route path="home" element={<Navigate to="/" replace={true} />} />

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
              <Route path="menu" element={<BurgerMenu />} />

              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </main>

          {isMenuClicked !== 'menu' && (
            <footer className="footer">
              <Footer />
            </footer>
          )}
        </div>
      </div>
    </>
  );
};
