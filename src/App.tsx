import {
  Link, NavLink, Route, Routes, useLocation,
} from 'react-router-dom';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { HomePage } from './pages/HomePage';
import './styles/styles.scss';
import { Product } from './types/Product';
import {
  getProductPriceWithDiscount,
  getProducts,
} from './helpers/ProductMethods';
import { SearchBar } from './components/SearchBar';
import { TabletPage } from './pages/TabetPage';
import { PhonePage } from './pages/PhonePage';
import { AccessoriesPage } from './pages/AccessoriesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductsDetailsPage } from './pages/ProductsDetailsPage';
import { CartPage } from './pages/CartPage';
import { CartItem } from './types/CartItem';
import { useLocalStorage } from './helpers/UseLocalStorage';
import { FavouritesPage } from './pages/FavouritesPage';

export const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isError, setError] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);
  const [favourites, setFavourites] = useState<Product[]>([]);
  const location = useLocation();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <header className="header">
        <div className="header__content">
          <div className="header__menu">
            <div className="header__logo logo">
              <NavLink to="/" className="logo-link">
                <img src="img/logo-2x.png" className="logo-img" alt="logo" />
              </NavLink>
            </div>
            <nav className="navbar">
              <NavLink
                to="/"
                className={({ isActive }) => cn('navbar__link',
                  { active: isActive })}
              >
                Home
              </NavLink>
              <NavLink to="/phones" className="navbar__link">
                Phones
              </NavLink>
              <NavLink to="/tablets" className="navbar__link">
                Tablets
              </NavLink>
              <NavLink to="/accessories" className="navbar__link">
                Accessories
              </NavLink>
            </nav>
          </div>
          <div className="header__right">
            {(location.pathname === '/phones' ||
              location.pathname === '/favourites' ||
              location.pathname === '/tablets' ||
              location.pathname === '/accessories') && (
              <SearchBar placeholder={location.pathname} />
            )}
            <div className="header__icons">
              <div className="header__icon-block">
                <NavLink
                  to="/favourites"
                  className={cn('icon icon--favorities', {
                    count: favourites.length > 0,
                  })}
                  data-count={favourites.length}
                />
              </div>
              <div className="header__icon-block">
                <NavLink
                  to="/cart"
                  className={cn('icon icon--cart', {
                    count: cartItems.length > 0,
                  })}
                  data-count={cartItems.length}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="main App__content">
        <Routes>
          {isError}
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
      <footer className="App__footer footer">
        <div className="footer_content">
          <div className="footer__menu">
            <div className="footer__logo logo">
              <NavLink to="/" className="logo-link">
                <img src="img/logo-2x.png" className="logo-img" alt="logo" />
              </NavLink>
            </div>
            <nav className="navbar footer__navbar">
              <NavLink
                to="https://github.com/yuliiaaaaa"
                className="navbar__link"
              >
                Github
              </NavLink>
              <NavLink to="/contacts" className="navbar__link">
                Contacts
              </NavLink>
              <NavLink to="/rights" className="navbar__link">
                Rights
              </NavLink>
            </nav>
            <div className="footer__button">
              <p className="footer__button-text">Back to top</p>
              <div className="footer__icon-block">
                <Link
                  to="#page-top"
                  className="icon icon--button-to-top"
                  onClick={(e) => handleBackToTop(e)}
                  aria-label="button-to-top"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
