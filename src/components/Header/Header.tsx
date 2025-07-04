import './Header.scss';
import '../../container.scss';
import { NavLink } from 'react-router-dom';
import { Navbar } from '../Navbar';
import SiteLogo from '../../img/nice-gadgets-logo.png';
import MobileLogo from '../../img/nice-gadgets-mobile.png';
import FavoriteIcon from './../../img/favorites-icon.png';
import CartIcon from '../../img/cart-icon.png';
import MenuIcon from '../../img/menu-icon.png';
import CloseIcon from '../../img/close-icon.png';
import { CartItem as CartItemType } from './../../types/CartItem';
// eslint-disable-next-line max-len
import { useFavorites } from '../../modules/FavoritesPage/FavoritesContext/FavoritesContext';

type Props = {
  onMenuClick: () => void;
  isOpen: boolean;
  cart: CartItemType[];
};

export const Header: React.FC<Props> = ({ onMenuClick, isOpen, cart }) => {
  const { favorites } = useFavorites();
  const totalQuantity = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <img
            src={SiteLogo}
            alt="site-logo"
            className="header__dekstop-logo"
          />
          <img
            src={MobileLogo}
            alt="mobile-logo"
            className="header__mobile-logo"
          />
        </div>
        <Navbar />
      </div>
      <div className="header__icons">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'header__icon is-active' : 'header__icon'
          }
        >
          <img src={FavoriteIcon} alt="favorite-icon" />
          {favorites.length > 0 && (
            <div className="header__icon-quantity">{favorites.length}</div>
          )}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'header__icon is-active' : 'header__icon'
          }
        >
          <img src={CartIcon} alt="cart-icon" />
          {cart.length > 0 && (
            <div className="header__icon-quantity">{totalQuantity}</div>
          )}
        </NavLink>
        <div
          className={`header__icon header__menu-icon ${isOpen ? 'hidden' : ''}`}
          onClick={onMenuClick}
        >
          <img src={MenuIcon} alt="menu-icon" />
        </div>
        <div
          className={`header__icon header__menu-icon ${isOpen ? '' : 'hidden'}`}
          onClick={onMenuClick}
        >
          <img src={CloseIcon} alt="menu-icon" />
        </div>
      </div>
    </header>
  );
};
