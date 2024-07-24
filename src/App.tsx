import './App.scss';

import { useEffect, useContext, memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './modules/shared/components/Header';
import { Home } from './modules/HomePage';
import { Menu } from './modules/HomePage/components/Menu';
import { Product } from './modules/Product';
import { Footer } from './modules/shared/components/Footer';

import { NotFoundPage } from './modules/NotFoundPage';
import { StateContext } from './modules/utils/GlobalStateProvider';
import { ProductDetails } from './modules/ProductDetails/ProductDetails';
import { Favourites } from './modules/Favourites';
import { Cart } from './modules/Cart';
import classNames from 'classnames';

// eslint-disable-next-line react/display-name
export const App = memo(() => {
  const { isMenuOpened, minLoadDelay, isDarkThemeOn, cartItems, likedItems } =
    useContext(StateContext);
  const bodyStyle = document.body.style;

  useEffect(() => {
    bodyStyle.overflow = isMenuOpened ? 'hidden' : 'auto';
  }, [isMenuOpened, bodyStyle]);

  return (
    <div className={classNames('App', { 'white-theme': !isDarkThemeOn })}>
      <Header
        isDarkThemeOn={isDarkThemeOn}
        isMenuOpened={isMenuOpened}
        cartItems={cartItems}
        likedItems={likedItems}
      />
      <Menu />

      <Routes>
        <Route path="home" element={<Navigate to="/" replace={true} />} />
        <Route path="/">
          <Route index element={<Home minLoadDelay={minLoadDelay} />} />
          <Route path="phones">
            <Route
              index
              element={<Product category="phones" title="Mobile phones" />}
            />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="tablets">
            <Route
              index
              element={<Product category="tablets" title="Tablets" />}
            />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="accessories">
            <Route
              index
              element={<Product category="accessories" title="Accessories" />}
            />
            <Route path=":productId" element={<ProductDetails />} />
          </Route>
          <Route path="favourites" element={<Favourites />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
});
