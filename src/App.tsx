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
import useAddToFavourite from './modules/Hooks/UseAddToCart';

export const App = () => {
  const { itemsInCart, favourites, toggleFavourite } = useAddToFavourite();
  return (

    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element=
              {<HomePage
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />} />
            <Route path="/phones" element=
              {<CatalogPage
                toggleFavourite={toggleFavourite}
                favourites={favourites}
              />} />
            <Route path="/tablets" element=
              {<CatalogPage
                toggleFavourite={toggleFavourite}
                favourites={favourites} />} />
            <Route path="/accessories" element=
              {<CatalogPage
                toggleFavourite={toggleFavourite}
                favourites={favourites} />} />
            <Route path="/phones/:productId" element=
              {<ProductPage
                toggleFavourite={toggleFavourite}
                favourites={favourites} />} />
            <Route path="/tablets/:productId" element=
              {<ProductPage
                toggleFavourite={toggleFavourite}
                favourites={favourites} />} />
            <Route path="/accessories/:productId" element=
              {<ProductPage
                toggleFavourite={toggleFavourite}
                favourites={favourites} />} />
            <Route path="/cart" element=
              {<CartPage
                itemsInCart={itemsInCart}
                toggleFavourite={toggleFavourite}
              />} />
            <Route path="/favourites" element={<FavouritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};
