import './App.scss';
import { Header } from './modules/Shared/Header/Header';
import { HomePage } from './modules/HomePage/HomePages';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CatalogPage } from './modules/CatalogPage/CatalogPage';
import { ProductPage } from './modules/ProductPage/ProductPage';
import { Footer } from './modules/Shared/Footer/Footer';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { CartPage } from './modules/CartPage';
import { FavouritesPage } from './modules/FavouritesPage';
import useAddToCart from './modules/Hooks/UseAddToCart';
import useAddToFavourite from './modules/Hooks/UseAddtoFavourite';

export const App = () => {
  const { itemsInCart, toggleInCart } = useAddToCart();
  const { favourites, toggleFavourite, favouriteButton } = useAddToFavourite();
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  itemsInCart={itemsInCart}
                  favouriteButton={favouriteButton}
                  toggleInCart={toggleInCart}
                  toggleFavourite={toggleFavourite}
                />
              }
            />
            <Route
              path="/phones"
              element={
                <CatalogPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/tablets"
              element={
                <CatalogPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/accessories"
              element={
                <CatalogPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/phones/:productId"
              element={
                <ProductPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/tablets/:productId"
              element={
                <ProductPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/accessories/:productId"
              element={
                <ProductPage
                  favouriteButton={favouriteButton}
                  toggleFavourite={toggleFavourite}
                  toggleInCart={toggleInCart}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  itemsInCart={itemsInCart}
                  toggleInCart={toggleInCart}
                />
              }
            />
            <Route
              path="/favourites"
              element={
                <FavouritesPage
                  toggleInCart={toggleInCart}
                  toggleFavourite={toggleFavourite}
                  favourites={favourites}
                  itemsInCart={itemsInCart}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
