import './Nav.scss';
import { CSSTransition } from 'react-transition-group';
import { NavLink, useLocation } from 'react-router-dom';
import React, {
  useContext, useState, memo, useCallback,
} from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { Logo } from '../Logo';
import { Menu } from '../Menu';
import { Search } from '../Search';
import { FavContext } from '../../storage/FavContext';
import { CartContext } from '../../storage/CartContext';
import { PageSizeContext } from '../../storage/PageSizeContext';
import { NavIcon } from '../NavIcon';

const getLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__item', 'navbar__item-after',
  { 'navbar__item--is-active': isActive },
);

const getIconLinkClass = ({ isActive }: { isActive: boolean }) => classNames(
  'navbar__icon-link', 'navbar__icon-link-after',
  { 'navbar__icon-link--is-active': isActive },
);

const isVisible = ['/phones', '/tablets', '/accessories', '/favourites'];

export const Nav: React.FC = memo(() => {
  const { favProducts } = useContext(FavContext);
  const { cartItems } = useContext(CartContext);
  const {
    isDesktopSize, isLaptopSize,
  } = useContext(PageSizeContext);
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <nav
      className="header_navbar navbar"
      data-cy="nav"
      role="navigation"
      aria-label="main navigation"
    >
      <CSSTransition
        in={isMenuOpen}
        timeout={1000}
        classNames="menu"
        mountOnEnter
        unmountOnExit
      >
        <Menu
          closeMenu={closeMenu}
        />
      </CSSTransition>

      <Logo />

      {(isDesktopSize || isLaptopSize) ? (
        <>
          <ul className="navbar__left-side">
            {pathname !== '/cart' && (
              <>
                <NavLink
                  to="/"
                  className={getLinkClass}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/phones"
                  className={getLinkClass}
                >
                  Phones
                </NavLink>

                <NavLink
                  to="/tablets"
                  className={getLinkClass}
                >
                  Tablets
                </NavLink>

                <NavLink
                  to="/accessories"
                  className={getLinkClass}
                >
                  Accessories
                </NavLink>
              </>
            )}
          </ul>

          <ul className="navbar__right-side">
            {isVisible.includes(pathname) && (
              <Search
                key={pathname}
              />
            )}

            {pathname !== '/cart' && (
              <NavLink
                to="/favourites"
                className={getIconLinkClass}
              >
                <NavIcon
                  itemsLength={favProducts.length}
                >
                  <ReactSVG
                    src="img/icons/Heart.svg"
                  />
                </NavIcon>
              </NavLink>
            )}

            <NavLink
              to="/cart"
              className={getIconLinkClass}
            >
              <NavIcon
                itemsLength={cartItems.length}
              >
                <ReactSVG
                  src="img/icons/Shopping bag.svg"
                />
              </NavIcon>
            </NavLink>
          </ul>
        </>
      ) : (
        <>
          {isVisible.includes(pathname) && (
            <Search
              key={pathname}
            />
          )}

          <div className="navbar__icon-link">
            <NavIcon>
              <ReactSVG
                src="img/icons/Hamburger.svg"
                onClick={() => setIsMenuOpen(true)}
              />
            </NavIcon>
          </div>
        </>
      )}
    </nav>
  );
});
