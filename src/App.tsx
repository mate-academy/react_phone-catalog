/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import './styles/styles.scss';
import { Product } from './types/Product';
import {
  getProductPriceWithDiscount,
  getProducts,
} from './helpers/ProductMethods';
import { TabletPage } from './pages/TabetPage';
import { PhonePage } from './pages/PhonePage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { CartPage } from './pages/CartPage';
import { CartItem } from './types/CartItem';
import { useLocalStorage } from './helpers/UseLocalStorage';
import { FavouritesPage } from './pages/FavouritesPage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setError] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const location = useLocation();

  useEffect(() => {
    getProducts('/products.json')
      .then(setProducts)
      .catch(() => setError(true));
  }, [location.pathname]);

  const productsWithDiscount = products.filter((el) => el.discount > 0);

  const priceAbsolutInPerCent = productsWithDiscount.map((el) => {
    const absolutePrice = el.price - getProductPriceWithDiscount(el);

    return { ...el, absolutePrice };
  });
  const filteredPriceAbsolutInPerCent = priceAbsolutInPerCent.sort(
    (a, b) => b.absolutePrice - a.absolutePrice,
  );

  const productsWithoutDiscount = products
    .filter((el) => el.discount === 0)
    .sort((a, b) => b.price - a.price);

  return (
    <div className="App">
      <Header cartItems={cartItems} favourites={favourites} />
      <div className="main App__content">
        {isError}
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                products={products}
                productsWithDiscount={filteredPriceAbsolutInPerCent}
                productsWithoutDiscount={productsWithoutDiscount}
                setCartItems={setCartItems}
                cartItems={cartItems}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            )}
          />
          <Route path="/phones">
            <Route
              index
              element={(
                <PhonePage
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
            <Route
              path=":productId"
              element={(
                <ProductsDetailsPage
                  products={products}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
          </Route>

          <Route path="/tablets">
            <Route
              index
              element={(
                <TabletPage
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
            <Route
              path=":productId"
              element={(
                <ProductsDetailsPage
                  products={products}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
          </Route>

          <Route path="/accessories">
            <Route
              index
              element={(
                <AccessoriesPage
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
            <Route
              path=":productId"
              element={(
                <ProductsDetailsPage
                  products={products}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                  favourites={favourites}
                  setFavourites={setFavourites}
                />
              )}
            />
          </Route>

          <Route
            path="/favourites"
            element={(
              <FavouritesPage
                setCartItems={setCartItems}
                cartItems={cartItems}
                favourites={favourites}
                setFavourites={setFavourites}
              />
            )}
          />
          <Route
            path="/cart"
            element={
              <CartPage setCartItems={setCartItems} cartItems={cartItems} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};
