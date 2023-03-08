import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './HeaderMobileMenu.scss';
import { HeaderNavLink } from './HeaderNavLink';

type Props = {
  navLinks: string[],
  setHasMobileMenu: (hasMobileMenu: boolean) => void,
  quantityCart?: number,
  quantityFavorites?: number,
};

export const HeaderMobileMenu: React.FC<Props> = ({
  navLinks, setHasMobileMenu, quantityCart, quantityFavorites,
}) => {
  const handleCloseMenu = () => setHasMobileMenu(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <nav className="mobile-menu">
      <div className="mobile-menu__top">
        <NavLink
          to="home"
          className="logo"
          onClick={handleCloseMenu}
        >
          <img src="icons/logo.svg" alt="logo" />
        </NavLink>

        <button
          type="button"
          className="icon icon--visible-on-mobile"
          onClick={handleCloseMenu}
        >
          <img
            src="icons/cross.svg"
            alt="cross"
            className="icon__item"
          />
        </button>
      </div>
      <ul className="mobile-menu__list">
        {navLinks.map(link => (
          <NavLink
            to={link}
            onClick={handleCloseMenu}
            className={({ isActive }) => classNames('mobile-menu__list-item', {
              'mobile-menu__list-item--selected': isActive,
            })}
          >
            {link}
          </NavLink>
        ))}
      </ul>
      <div className="mobile-menu__bottom">
        <HeaderNavLink
          link="favorites"
          className="icon icon--menu icon--visible-on-mobile"
          quantity={quantityFavorites}
          onClick={handleCloseMenu}
        >
          <img
            src="icons/favourites.svg"
            alt="favourites"
            className="icon__item"
          />
        </HeaderNavLink>

        <HeaderNavLink
          link="cart"
          className="icon icon--menu icon--visible-on-mobile"
          quantity={quantityCart}
          onClick={handleCloseMenu}
        >
          <img
            src="icons/cart.svg"
            alt="cart"
            className="icon__item"
          />
        </HeaderNavLink>
      </div>
    </nav>

  );
};
