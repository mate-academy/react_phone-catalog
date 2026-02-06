/* eslint max-len: "off" */
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { PathProvider } from './components/context/PathContext';
import { CardAndFavouritesProvider } from './components/context/CardAndFavouritesContext';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductInfoPage } from './pages/ProductInfoPage';
import { Footer } from './components/Footer';
import { CardPage } from './pages/CardPage';

export const App = () => (
  <CardAndFavouritesProvider>
    <PathProvider>
      <div className="app">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/favourites" element={} /> */}
            <Route path="/card" element={<CardPage />} />

            <Route
              path="/product-not-found"
              element={<NotFoundPage type="product" />}
            />
            <Route path="/not-found" element={<NotFoundPage type="page" />} />
            <Route path=":category">
              <Route index element={<ProductsPage />} />
              <Route path=":itemId" element={<ProductInfoPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </PathProvider>
  </CardAndFavouritesProvider>
);
