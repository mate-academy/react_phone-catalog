import { useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { NavLinks } from '../../types/NavLinks';
import { HeaderNavLink } from './HeaderNavLink';
import { HeaderMobileMenu } from './HeaderMobileMenu';
import {
  CartContext, FavoritesContext,
} from '../../helpers/LocaleStorageContext';
import { SearchInput } from '../SearchInput';
import './Header.scss';

export const Header = () => {
  const navLinks = Object.keys(NavLinks);
  const [hasMobileMenu, setHasMobileMenu] = useState(false);
  const handleClickMenu = () => setHasMobileMenu(true);
  const { cart } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const location = useLocation();
  const { productId } = useParams();
  const hasSearchInput = (
    [...navLinks, 'favorites'].some(link => (location.pathname.includes(link)))
  ) && !productId;

  return (
    <>
      <CSSTransition
        in={hasMobileMenu}
        classNames="mobile-menu"
        timeout={300}
        mountOnEnter
        unmountOnExit
      >
        <HeaderMobileMenu
          navLinks={navLinks}
          setHasMobileMenu={setHasMobileMenu}
          quantityCart={cart.length}
          quantityFavorites={favorites.length}
        />
      </CSSTransition>

      <header className="header">
        <div className="header__container">
          <HeaderNavLink
            link="home"
            className="logo"
          >
            <img src="icons/logo.svg" alt="logo" />
          </HeaderNavLink>

          <ul className="links">
            {navLinks.map(link => (
              <HeaderNavLink
                link={link}
                className="links__item"
                key={link}
              >
                {link}
              </HeaderNavLink>
            ))}
          </ul>
        </div>
        <div className="header__container">
          <button
            type="button"
            className="icon icon--visible-on-mobile"
            onClick={handleClickMenu}
          >
            <img
              src="icons/menu.svg"
              alt="menu"
              className="icon__item"
            />
          </button>

          {hasSearchInput && (
            <SearchInput placeholder={location.pathname.slice(1)} />
          )}

          <HeaderNavLink
            link="favorites"
            className="icon"
            quantity={favorites.length}
          >
            <img
              src="icons/favourites.svg"
              alt="favourites"
              className="icon__item"
            />
          </HeaderNavLink>

          <HeaderNavLink
            link="cart"
            className="icon"
            quantity={cart.length}
          >
            <img
              src="icons/cart.svg"
              alt="cart"
              className="icon__item"
            />
          </HeaderNavLink>
        </div>
      </header>
    </>
  );
};
