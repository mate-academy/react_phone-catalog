import './aside.scss';
import { FC } from 'react';
import cartIcon from '../../images/header/logo-cart.png';
import favIcon from '../../images/header/logo-favourites.png';
import { NavLink } from 'react-router-dom';
import logo from '../../images/header/logo-nice-gadgets.png';
import close from '../../images/header/logo-close.png';
import { useEffect, useState } from 'react';
// eslint-disable-next-line max-len
import { useFavorites } from '../../components/favoritesContext/favoritesContext';
import { useCart } from '../../components/cartContext/cartContext';

interface AsideProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const Aside: FC<AsideProps> = ({ setIsMenuOpen, isMenuOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { favorites } = useFavorites();
  const { cart } = useCart();

  useEffect(() => {
    if (isMenuOpen) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 10);

      return () => clearTimeout(timeout);
    } else {
      setIsVisible(false);

      return undefined;
    }
  }, [isMenuOpen]);

  return (
    <aside className={`aside ${isVisible ? 'open' : ''}`}>
      <div className="aside__header">
        <div className="aside__header--logo">
          <img
            src={logo}
            alt="Nice Gadgets Logo"
            className="aside__header--logo--img"
          />
        </div>
        <div className="aside__header--icon">
          <NavLink to="/" className="aside__header--icon--box">
            <img
              src={close}
              alt="Menu"
              className="aside__header--icon--img"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </NavLink>
        </div>
      </div>

      <div className="aside__menu">
        <ul className="aside__menu--list">
          <li className="aside__menu--list--item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'aside__menu--list--link active'
                  : 'aside__menu--list--link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li className="aside__menu--list--item">
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive
                  ? 'aside__menu--list--link active'
                  : 'aside__menu--list--link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              PHONES
            </NavLink>
          </li>
          <li className="aside__menu--list--item">
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive
                  ? 'aside__menu--list--link active'
                  : 'aside__menu--list--link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              TABLETS
            </NavLink>
          </li>
          <li className="aside__menu--list--item">
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive
                  ? 'aside__menu--list--link active'
                  : 'aside__menu--list--link'
              }
              onClick={() => setIsMenuOpen(false)}
            >
              ACESSORIES
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="aside__footer">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'aside__footer--box active' : 'aside__footer--box'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="favoritesWrapper">
            <img
              src={favIcon}
              alt="Favorites"
              className="aside__footer--icon"
            />
            {favorites.length > 0 && (
              <span className="favoritesWrapper__count">
                {favorites.length}
              </span>
            )}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'aside__footer--box active' : 'aside__footer--box'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="cartWrapper">
            <img src={cartIcon} alt="Cart" className="aside__footer--icon" />
            {cart.length > 0 && (
              <span className="favoritesWrapper__count">{cart.length}</span>
            )}
          </div>
        </NavLink>
      </div>
    </aside>
  );
};
