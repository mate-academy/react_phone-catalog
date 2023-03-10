import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { Search } from './Search';

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
          className={({ isActive }) => (
            classNames('header__link-icon', { isActive }))}
        >
          <img src="./img/icons/FavouritesHeart.svg" alt="bag" />
          {favCount !== 0 && <span>{favCount}</span>}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (
            classNames('header__link-icon', { isActive }))}
        >
          <img src="./img/icons/ShoppingBagCart.svg" alt="bag" />
          {inCartCount !== 0 && <span>{inCartCount}</span>}
        </NavLink>
      </div>
    </div>
  );
};
