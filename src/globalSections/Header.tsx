import { FC, useContext, useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, Route, Routes,
} from 'react-router-dom';
import { CartIcon } from 'src/components/Icons/CartIcon';
import { HeartIcon } from 'src/components/Icons/HeartIcon';
import { LogoIcon } from 'src/components/Icons/LogoIcon';
import { InputSearch } from 'src/components/InputSearch';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { HeaderList } from 'src/components/HeaderList';
import { ProductContext } from 'src/contexts/ProductContext';
import { hasProducts } from 'src/utils/helpers/hasProducts';

type Props = {
  scrollToRef: React.MutableRefObject<null>,
};

export const Header: FC<Props> = ({ scrollToRef }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cart, setCart] = useLocalStorage('cart', '');
  const { products } = useContext(ProductContext);
  const hasAccessories = hasProducts(products, 'accessories');
  const hasTablets = hasProducts(products, 'tablets');
  const hasPhone = hasProducts(products, 'phones');

  useEffect(() => {
    window.addEventListener('storage', () => {
      if (setFavourites) {
        setFavourites(JSON.parse(localStorage.getItem('favourites') || '[]'));
        setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
      }
    });
  }, []);

  return (
    <div className="header" ref={scrollToRef}>
      <div className="header__nav header__nav-left">
        <div className="header__logo logo">
          <Link to="/">
            <LogoIcon />
          </Link>
        </div>

        <Routes>
          <Route path="/">
            <Route index element={<HeaderList />} />
            <Route path="phones" element={<HeaderList />} />
            <Route path="phones/:productId" element={<HeaderList />} />
            <Route path="tablets" element={<HeaderList />} />
            <Route path="tablets/:productId" element={<HeaderList />} />
            <Route path="accessories" element={<HeaderList />} />
            <Route path="accessories/:productId" element={<HeaderList />} />
            <Route path="favourites" element={<HeaderList />} />
          </Route>
        </Routes>

      </div>

      <div className="header__nav header__nav-right">
        <Routes>
          {hasPhone && (
            <Route path="/phones" element={<InputSearch />} />
          )}

          {hasTablets && (
            <Route path="/tablets" element={<InputSearch />} />
          )}

          {hasAccessories && (
            <Route path="/accessories" element={<InputSearch />} />
          )}
        </Routes>

        <NavLink
          className={({ isActive }) => classNames(
            'header__favourites',
            { 'is-header-link-active': isActive },
          )}
          to="/favourites"
        >
          <div className="header__favourites__link">
            {!!favourites.length && (
              <span className="link-counter">
                <span>
                  {favourites.length}
                </span>
              </span>
            )}
            <HeartIcon />
          </div>
        </NavLink>

        <NavLink
          className={({ isActive }) => classNames(
            'header__cart',
            { 'is-header-link-active': isActive },
          )}
          to="/cart"
        >
          <div className="header__cart__link">
            {!!cart.length && (
              <span className="link-counter">
                <span>
                  {cart.length}
                </span>
              </span>
            )}
            <CartIcon />
          </div>
        </NavLink>
      </div>
    </div>
  );
};
