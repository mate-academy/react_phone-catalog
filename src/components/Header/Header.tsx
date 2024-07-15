import classNames from 'classnames';
import './Header.scss';
import { Link, NavLink } from 'react-router-dom';
import {
  logoImg,
  menuImg,
  favouritesImg,
  bagImg,
  closeImg,
} from './../../utils/kit';
import { Menu } from '../Menu/Menu';

const getStylelinkNav = ({ isActive }: { isActive: boolean }) => {
  return classNames('nav__link', {
    nav__active: isActive,
  });
};

const getStylelinkActions = ({ isActive }: { isActive: boolean }) => {
  return classNames('actions__link', {
    actions__active: isActive,
  });
};

interface Props {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMenuOpen: boolean;
}

export const Header: React.FC<Props> = ({ setIsMenuOpen, isMenuOpen }) => {
  const toggleMenu = () => {
    setIsMenuOpen((prev: boolean) => !prev);
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logoImg} className="header__logo-img" />
      </Link>

      <div className="navContainer">
        <nav className="nav">
          <NavLink to="/" className={getStylelinkNav}>
            Home
          </NavLink>
          <NavLink to="phones" className={getStylelinkNav}>
            Phones
          </NavLink>
          <NavLink to="tablets" className={getStylelinkNav}>
            Tablets
          </NavLink>
          <NavLink to="accessories" className={getStylelinkNav}>
            Acsessories
          </NavLink>
        </nav>

        <div className="actions">
          <NavLink to="favorites" className={getStylelinkActions}>
            <img src={favouritesImg} alt="Favourites" />
          </NavLink>

          <NavLink to="cart" className={getStylelinkActions}>
            <img src={bagImg} alt="Bag" />
          </NavLink>
        </div>
      </div>

      <div className="BurgerMenu">
        <button
          type="button"
          className="BurgerMenu__button"
          onClick={toggleMenu}
        >
          <img src={isMenuOpen ? closeImg : menuImg} alt="BurgerMenu" />
        </button>
      </div>
      {isMenuOpen && <Menu />}
    </header>
  );
};
