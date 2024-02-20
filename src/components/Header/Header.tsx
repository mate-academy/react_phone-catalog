import { useState } from 'react';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import { NavBar } from '../Navbar/NavBar';
import { Logo } from '../Logo/Logo';
import { SearchBar } from '../SearchBar/SearchBar';
import { useAppContext } from '../../store/AppContext';
import { useButtonHighlighed } from '../../helpers/useButtonHighlighed';
import { SideNav } from '../SideNav/SideNav';

const getLinkClass = (
  { isActive }: { isActive: boolean },
) => classNames('header__button', {
  'header__button--active': isActive,
});

export const Header = () => {
  const { state: { cart, favourites } } = useAppContext();
  const { pathname } = useLocation();
  const [isSideNavShown, setIsSideNavShown] = useState(false);

  const isSearchShown = pathname === '/phones'
  || pathname === '/tablets'
  || pathname === '/accessories'
  || pathname === '/favourites';

  const isNavShown = pathname !== '/cart';

  const inCartQuantity = cart
    .reduce((accumulator, item) => accumulator + item.quantity, 0);
  const inFavouritesQuantity = favourites.length;

  const isFavBtnHighligthed = useButtonHighlighed(inFavouritesQuantity);
  const isCartBtnHighligthed = useButtonHighlighed(inCartQuantity);

  return (
    <header className="header">
      <div className="header__left">
        <Logo />
        {isNavShown && <NavBar />}
      </div>

      <div className="header__right">
        {isSearchShown && <SearchBar />}

        <NavLink
          to="/favourites"
          className={getLinkClass}
        >
          <span
            className="header__icon header__icon--favourites"
          />
          {inFavouritesQuantity > 0 && (
            <span
              className={classNames('header__badge header__badge--fav', {
                'header__badge--bump': isFavBtnHighligthed,
              })}
            >
              {inFavouritesQuantity}
            </span>
          )}

        </NavLink>

        <NavLink
          to="/cart"
          className={getLinkClass}
        >
          <span
            className="header__icon header__icon--cart"
          />
          {inCartQuantity > 0 && (
            <span
              className={classNames('header__badge header__badge--cart', {
                'header__badge--bump': isCartBtnHighligthed,
              })}
            >
              {inCartQuantity}
            </span>
          )}

        </NavLink>

        <button
          type="button"
          className="header__button header__burger-menu-button"
          aria-label="side-menu"
          onClick={() => {
            setIsSideNavShown(prevValue => !prevValue);
          }}
        >
          <span className="header__burger-menu-button-icon" />
        </button>

        {isSideNavShown && (
          <SideNav
            isSideNavShown={isSideNavShown}
            setIsSideNavShown={setIsSideNavShown}
          />
        )}
      </div>
    </header>
  );
};
