import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { Navbar } from '../NavBar';
import './Header.scss';

type Props = {
  onMenuClick: () => void;
  isOpen: boolean;
};

export const Header: React.FC<Props> = ({ onMenuClick, isOpen }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">
          <Link to="/">
            <img src="img/logo.svg" alt="site-logo" className="header__dekstop-logo" />
          </Link>
          <img src="img/logo.svg" alt="mobile-logo" className="header__mobile-logo" />
        </div>
        <Navbar />
      </div>
      <div className="header__icons">
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? 'header__icon is-active' : 'header__icon')}
        >
          <img src="img/icons/Favourites.svg" alt="favorite-icon" />
          {favorites.length > 0 && <div className="header__icon-quantity">{favorites.length}</div>}
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? 'header__icon is-active' : 'header__icon')}
        >
          <img src="img/icons/Cart.svg" alt="cart-icon" />
          {cart.length > 0 && <div className="header__icon-quantity">{totalQuantity}</div>}
        </NavLink>
        <div
          className={`header__icon header__menu-icon ${isOpen ? 'hidden' : ''}`}
          onClick={onMenuClick}
        >
          <img src="img/icons/Menu.svg" alt="menu-icon" />
        </div>
        <div
          className={`header__icon header__menu-icon ${isOpen ? '' : 'hidden'}`}
          onClick={onMenuClick}
        >
          <img src="img/icons/Close.svg" alt="menu-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
