import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../context/AppContext';

import './Header.scss';
import { Logo } from '../Logo/Logo';
import { Navbar } from '../Navbar/Navbar';
import Search from '../Search/Search';

export const Header = () => {
  const { pathname } = useLocation();
  const { favCount, inCartCount } = useAppContext();

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames('header__link-icon', {
      'header__link-icon--active': isActive,
    });

  const isShowSearchInput =
    pathname === '/phones' ||
    pathname === '/tablets' ||
    pathname === '/accessories' ||
    pathname === '/favourites';

  return (
    <div className="header">
      <div className="header__left">
        <Logo />
        <Navbar />
      </div>
      <div className="header__right">
        {isShowSearchInput && <Search />}

        <NavLink to="/favourites" className={getLinkClass}>
          <img src="./img/svg/Heart.svg" alt="heart" />
          {favCount !== 0 && <span>{favCount}</span>}
        </NavLink>
        <NavLink to="/cart" className={getLinkClass}>
          <img src="./img/svg/Bag.svg" alt="cart" />
          {inCartCount !== 0 && <span>{inCartCount}</span>}
        </NavLink>
      </div>
    </div>
  );
};
