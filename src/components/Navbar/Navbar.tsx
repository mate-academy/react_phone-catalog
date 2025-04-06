import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../../image/logo.svg';
import BlackLogo from '../../../image/BlackLogo.svg';
import Favourites from '../../../image/heart.svg';
import cartimg from '../../../image/shopping.svg';
import BlackFavourites from '../../../image/blackHeart.svg';
import Blackcart from '../../../image/blackShoppinng.svg';
import menu from '../../../image/menu.svg';
import menuBlack from '../../../image/menuBlack.svg';
import close from '../../../image/close.svg';
import Blackclose from '../../../image/BlackClose.svg';
import { Switches } from '../Switch/Switches';
import { useContext } from 'react';
import { ThemeContext } from '../ColorThemes/ColorThemes';
import { useFavourites } from '../Favourites/FacouritesContext';
import { useCart } from '../BuyCard/CartContext';

interface NavbarProps {
  setMenuIsOpen: () => void;
  menuIsOpen: boolean;
  setMenuIsClose: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  setMenuIsOpen,
  menuIsOpen,
  setMenuIsClose,
}) => {
  const { theme } = useContext(ThemeContext);
  const { favorites } = useFavourites();
  const { cart } = useCart();
  const isDarkMode = theme === 'dark';

  const totalItemCount = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  return (
    <header className="header">
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="wraper__navbar">
            <NavLink className="logo" to="/">
              <img
                src={isDarkMode ? logo : BlackLogo}
                alt="Logo"
                className="logo__img"
              />
            </NavLink>
            <div className="navbar-brand">
              <NavLink className="navbar-item" to="/">
                Home
              </NavLink>

              <NavLink className="navbar-item" to="/phones">
                Phones
              </NavLink>

              <NavLink className="navbar-item" to="/tablets">
                Tablets
              </NavLink>

              <NavLink className="navbar-item" to="/accessories">
                Accessories
              </NavLink>
            </div>
          </div>

          <Switches />

          <div className="buttons__menu">
            <NavLink className="logo likes" to="/favourites">
              <img
                src={isDarkMode ? Favourites : BlackFavourites}
                alt="heart"
              />
              {favorites.length > 0 && (
                <span className="badge2">{favorites.length}</span>
              )}
            </NavLink>

            <NavLink className="logo shopping" to="/cart">
              <img src={isDarkMode ? cartimg : Blackcart} alt="shopping" />
              {cart.length > 0 && (
                <span className="badge">{totalItemCount}</span>
              )}
            </NavLink>

            {menuIsOpen ? (
              <div className="logo menu close" onClick={setMenuIsClose}>
                <img src={isDarkMode ? close : Blackclose} alt="close" />
              </div>
            ) : (
              <div className={`logo menu`} onClick={setMenuIsOpen}>
                <img src={isDarkMode ? menu : menuBlack} alt="menu" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
