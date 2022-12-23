import { FC, useEffect } from 'react';
import classNames from 'classnames';
import {
  Link, NavLink, Route, Routes,
} from 'react-router-dom';
import { CartIcon } from 'src/components/Icons/CartIcon';
import { HeartIcon } from 'src/components/Icons/HeartIcon';
import { LogoIcon } from 'src/components/Icons/LogoIcon';
import { InputSearch } from 'src/components/InputSearch';
import { PageLink } from 'src/components/PageLink';
import { useLocalStorage } from 'src/hooks/useLocalStorage';

type Props = {
  scrollToRef: React.MutableRefObject<null>,
};

export const Header: FC<Props> = ({ scrollToRef }) => {
  const [favourites, setFavourites] = useLocalStorage('favourites', '');
  const [cart, setCart] = useLocalStorage('cart', '');

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

        <ul className="header__list">
          <li className="header__item">
            <PageLink to="/" text="Home" />
          </li>
          <li className="header__item">
            <PageLink to="/phones" text="Phones" />
          </li>
          <li className="header__item">
            <PageLink to="/tablets" text="Tablets" />
          </li>
          <li className="header__item">
            <PageLink to="/accessories" text="Accessories" />
          </li>
        </ul>
      </div>

      <div className="header__nav header__nav-right">
        <Routes>
          <Route path="/phones" element={<InputSearch />} />
          <Route path="/tablets" element={<InputSearch />} />
          <Route path="/accessories" element={<InputSearch />} />
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
