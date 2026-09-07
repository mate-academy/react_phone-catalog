import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage/HomePage';
import { NotFoundPage } from './Pages/NotFoundPage/NotFoundPage';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import './styles/global.scss';
// eslint-disable-next-line
import { AddAndFavoritesProvider } from './components/context/AddAndFavoritesContext';
import { PathProvider } from './components/context/PathContext';
import { ProductCategoryPage } from './Pages/ProductCategoryPage';
import { CartPage } from './Pages/CartPage/CartPage';
import { FavoritesPage } from './Pages/FavoritesPage/FavoritesPage';
import { ProductInfoPage } from './Pages/ProductInfoPage/ProductInfoPage';

export const App = () => {
  return (
    <AddAndFavoritesProvider>
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

              <Route path="/cart" element={<CartPage />} />

              <Route
                path="/product-not-found"
                element={<NotFoundPage type="page" />}
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </PathProvider>
    </AddAndFavoritesProvider>
  );
};
