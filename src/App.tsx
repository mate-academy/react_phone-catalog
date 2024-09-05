import { Navigate, Route, Routes } from 'react-router-dom';
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

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, [dispatch]);

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
              <Route path=":category">
                <Route index element={<GeneralProductsPage />} />
                <Route path=":productId?" element={<ItemInformation />} />
              </Route>

              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="bucket" element={<BucketPage />} />

              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </main>

          <footer className="footer">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
};
