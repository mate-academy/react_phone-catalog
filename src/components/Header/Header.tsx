import { useState } from 'react';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import { AsideMenu } from './AsideMenu';
import { useCart } from '../CartContext';
import { useFavourites } from '../FavouritesContext';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { totalCount } = useCart();
  const { favourites } = useFavourites();
  const favouritesCount = favourites.length;

  const getActionBtnClass = ({ isActive }: { isActive: boolean }) =>
    `header__action-btn${isActive ? ' header__action-btn--active' : ''}`;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        NICE
        <img src="./img/Finger.png" alt="Finger" className="header__icon" />
        <br />
        GADGETS
      </Link>

      <nav className="header__nav">
        <NavLink to="/" className="header__nav-link" end>
          Home
        </NavLink>
        <NavLink to="/phones" className="header__nav-link">
          Phones
        </NavLink>
        <NavLink to="/tablets" className="header__nav-link">
          Tablets
        </NavLink>
        <NavLink to="/accessories" className="header__nav-link">
          Accessories
        </NavLink>
      </nav>

      <div className="header__actions">
        <NavLink to="/favorites" className={getActionBtnClass}>
          <div className="header__icon-wrapper">
            <img
              src="./img/love.svg"
              alt="Favorites"
              className="header__action-icon"
            />
            {favouritesCount > 0 && (
              <span className="header__badge">{favouritesCount}</span>
            )}
          </div>
        </NavLink>

        <NavLink to="/cart" className={getActionBtnClass}>
          <div className="header__icon-wrapper">
            <img
              src="./img/Shopping_bag.svg"
              alt="Cart"
              className="header__action-icon"
            />
            {totalCount > 0 && (
              <span className="header__badge">{totalCount}</span>
            )}
          </div>
        </NavLink>
      </div>

      <button
        type="button"
        className="header__aside-btn"
        onClick={() => setIsMenuOpen(true)}
      >
        <img src="./img/Union.svg" alt="Menu" className="header__aside-icon" />
      </button>

      <AsideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
