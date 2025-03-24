// import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../../image/logo.svg';
import BlackLogo from '../../../image/BlackLogo.svg';
import Favourites from '../../../image/heart.svg';
import cart from '../../../image/shopping.svg';
import BlackFavourites from '../../../image/blackHeart.svg';
import Blackcart from '../../../image/blackShoppinng.svg';
import menu from '../../../image/menu.svg';
import close from '../../../image/close.svg';
import Blackclose from '../../../image/BlackClose.svg';
import { Switches } from '../Switch/Switches';
import { useContext } from 'react';
// import { useContext } from 'react';
import { ThemeContext } from '../ColorThemes/ColorThemes';
import { useFavourites } from '../Favourites/FacouritesContext';
import { useCart } from '../BuyCard/useCard';

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
  const { cart: cartItems } = useCart();
  const isDarkMode = theme === 'dark';

  // useEffect(() => {
  //   const updateCartCount = () => {
  //     const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  //     setCartCount(Array.isArray(savedCart) ? savedCart.length : 0);
  //   };

  //   updateCartCount();

  //   window.addEventListener('storage', updateCartCount);

  //   return () => window.removeEventListener('storage', updateCartCount);
  // }, []);

  // useEffect(() => {}, [favorites]);

  return (
    <header className="header">
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
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
              <img src={isDarkMode ? cart : Blackcart} alt="shopping" />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </NavLink>

            {menuIsOpen ? (
              <div
                className="logo menu close"
                // to="/close"
                onClick={setMenuIsClose}
              >
                <img src={isDarkMode ? close : Blackclose} alt="close" />
              </div>
            ) : (
              <div
                className={`logo menu`}
                // to="/menu"
                onClick={setMenuIsOpen}
              >
                <img src={menu} alt="menu" />
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
