import { Routes, Route } from 'react-router-dom';
import './App.scss';

import './styles/style.scss';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage/HomePage';
import { ProductCategoryPage } from './components/ProductCategoryPage';
import { ProductInfoPage } from './components/ProductInfoPage';

import { PathProvider } from './components/contexts/PathContext';
import { ProductNotFoundPage } from './components/ProductNotFoundPage';
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage';
import { AddAndFavouritesProvider } from './components/contexts/AddAndFavouriteContext';

export const App = () => {
  return (
    <AddAndFavouritesProvider>
      <PathProvider>
        <div className="app">
          <Header />

          <main className="main">
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path=":category">
                <Route index element={<ProductCategoryPage />} />

                <Route path=":itemId" element={<ProductInfoPage />} />
              </Route>

              <Route path="/favorites" element={<FavoritesPage />} />

              <Route
                path="/product-not-found"
                element={<ProductNotFoundPage />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </PathProvider>
    </AddAndFavouritesProvider>
  );
};
