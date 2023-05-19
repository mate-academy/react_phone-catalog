import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Logo } from '../Logo/Logo';
import { Navbar } from '../Navbar/Navbar';
import { Search } from '../Search/Search';
import heartTransparent from '../../assets/svg/heartTransparent.svg';
import cart from '../../assets/svg/cart.svg';

import './header.scss';

export const Header = () => {
  const { pathname } = useLocation();
  const { favCount, inCartCount } = useAppContext();

  const isShowSearchInput = pathname === '/phones'
    || pathname === '/tablets'
    || pathname === '/accessories'
    || pathname === '/favourites';

  return (
    <div className="header">
      <div className="header__left">
        <Logo />
        <Navbar />
      </div>
      <div className="header__right">
        {isShowSearchInput && <Search />}

        <NavLink
          to="/favourites"
          className={({ isActive }) => classNames(
            'header__link-icon',
            {
              'header__link-icon--active': isActive,
            },
          )}
        >
          <img src={heartTransparent} alt="heart" />
          {favCount !== 0 && <span>{favCount}</span>}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => classNames(
            'header__link-icon',
            {
              'header__link-icon--active': isActive,
            },
          )}
        >
          <img src={cart} alt="cart" />
          {inCartCount !== 0 && <span>{inCartCount}</span>}
        </NavLink>
      </div>
    </div>
  );
};
