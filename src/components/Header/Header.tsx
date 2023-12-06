import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  useLocation,
} from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import { useAppSelector } from '../../helpers/app/hooks';
import { getTotalQuantity } from '../../helpers/utils/getTotalAmount';

import { Nav } from '../Nav';
import { Search } from '../Search';

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return classNames('Header__link', {
    'Header__link--is-active': isActive,
  });
};

export const Header = () => {
  const { favorites } = useAppSelector(state => state.favorites);
  const { cart } = useAppSelector(state => state.cart);

  const [isSearchAvailable, setIsSearchAvailable] = useState(false);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setIsSearchAvailable(
      path === '/phones'
      || path === '/tablets'
      || path === '/accessories'
      || path === '/favorites',
    );
  }, [path]);

  const handleToTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="Header">
      <div className="Header__left">
        <Link
          to="/"
          className="Header__logo"
          onClick={handleToTopScroll}
        />

        {path !== '/cart' && (
          <Nav />
        )}
      </div>

      <div className="Header__right">
        {isSearchAvailable && (
          <Search />
        )}
        {path !== '/cart' && (
          <div className="Header__link-wrapper">
            <NavLink
              to="/favorites"
              className={getLinkClass}
            >
              {!!favorites.length && (
                <p className="Header__count">{favorites.length}</p>
              )}
            </NavLink>
          </div>
        )}

        <div className="Header__link-wrapper Header__link-wrapper--cart">
          <NavLink
            to="/cart"
            className={getLinkClass}
          >
            {!!cart.length && (
              <p className="Header__count">{getTotalQuantity(cart)}</p>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};
