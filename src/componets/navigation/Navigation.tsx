import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames';
import logo from '../../img/logo.svg';
import favourites from '../../img/favourites.svg';
import cart from '../../img/cart.svg';
import './Navigation.scss';
import { SearchInput } from '../searchInput/SearchInput';
import { useAppSelector } from '../../app/hooks';
import { CartItemType } from '../../types/CartItemType';
import openMenu from '../../img/menu-open.png';
import closeMenu from '../../img/menu-close.png';
import MobileMenu from '../mobileMenu/MobileMenu';

type NavigationProps = {
  searchPlaceholder: string;
};

export const Navigation: React.FC<NavigationProps> = ({
  searchPlaceholder,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const favouritesCounter = useAppSelector((state) => state.favourites.count);
  const items = useAppSelector((state) => state.cart.items);
  const totalCount = items.reduce(
    (sum: number, item: CartItemType) => sum + item.count,
    0,
  );

  const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
    'nav__link', {
      'nav__link--is-active': isActive,
    },
  );

  const getLinkClassRight = ({ isActive }: { isActive: boolean }) => classNames(
    'nav__link nav__link-right', {
      'nav__link--is-activeRight': isActive,
    },
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="nav">
      <div className="nav__panel">
        <div className="nav__left">
          <div className="nav__open-menu">
            <button
              type="button"
              className="nav__menu-button"
              onClick={toggleMobileMenu}
            >
              {!isMobileMenuOpen ? (
                <img
                  src={openMenu}
                  alt="open menu"
                  className="nav__menu-icon"
                />
              ) : (
                <img
                  src={closeMenu}
                  alt="close menu"
                  className="nav__menu-icon"
                />
              )}

            </button>
            {isMobileMenuOpen
            && (
              <MobileMenu
                isOpen={isMobileMenuOpen}
                closeMenu={toggleMobileMenu}
              />
            )}
          </div>
          <NavLink to="/" className="nav__link">
            <img src={logo} alt="logo" className="nav__logo" />
          </NavLink>
          {location.pathname !== '/cart' && (
            <div className="nav__links-block">
              <NavLink to="/" className={getLinkClass}>
                home
              </NavLink>
              <NavLink to="/phones" className={getLinkClass}>
                phones
              </NavLink>
              <NavLink to="/tablets" className={getLinkClass}>
                tablets
              </NavLink>
              <NavLink to="/accessories" className={getLinkClass}>
                accessories
              </NavLink>
            </div>
          )}
        </div>
        <div className="nav__right">
          {(location.pathname === '/phones'
          || location.pathname === '/tablets'
          || location.pathname === '/accessories'
          || location.pathname === '/favourites') && (
            <SearchInput placeholder={searchPlaceholder} />
          )}
          {location.pathname !== '/cart' && (
            <div className="nav__right-container">
              <NavLink to="/favourites" className={getLinkClassRight}>
                <img src={favourites} alt="favourites" className="nav__icon" />
                {favouritesCounter > 0 && (
                  <span className="nav__counter">{favouritesCounter}</span>
                )}
              </NavLink>
            </div>
          )}

          <div className="nav__right-container">
            <NavLink to="/cart" className={getLinkClassRight}>
              <img src={cart} alt="cart" className="nav__icon" />
              {totalCount > 0 && (
                <span className="nav__counter">{totalCount}</span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
