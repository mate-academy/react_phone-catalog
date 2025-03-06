// import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../../image/logo.svg';
import Favourites from '../../../image/heart.svg';
import cart from '../../../image/shopping.svg';
import menu from '../../../image/menu.svg';
import close from '../../../image/close.svg';

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
  // const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  //   classNames('navbar-item', { 'has-color-white-lighter': isActive });

  return (
    <header className="header">
      <nav
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <NavLink className="logo" to="/">
            <img src={logo} alt="Logo" className="logo__img" />
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
          <div className="buttons">
            <NavLink className="logo likes" to="/favourites">
              <img src={Favourites} alt="heart" />
            </NavLink>

            <NavLink className="logo shopping" to="/cart">
              <img src={cart} alt="shopping" />
            </NavLink>

            {menuIsOpen ? (
              <div
                className="logo menu close"
                // to="/close"
                onClick={setMenuIsClose}
              >
                <img src={close} alt="close" />
              </div>
            ) : (
              <div
                className={`logo menu ${menuIsOpen && 'closeMenu'}`}
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
