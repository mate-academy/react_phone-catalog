import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/logo';
import {
  getClassIconForMenu,
  getClassNavForMenu,
} from '../../utils/getLinkClass';

type Props = {
  toggleMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ toggleMenu }) => {
  return (
    <div className="menu">
      <header className="header">
        <Logo />

        <div className="header__menu-container">
          <button className="header__icon icon" onClick={toggleMenu}>
            <img src="img/icons/close.svg" alt="menu" className="icon__img" />
          </button>
        </div>
      </header>

      <div className="menu__nav-list">
        <NavLink to="/" className={getClassNavForMenu}>
          Home
        </NavLink>

        <NavLink to="/phones" className={getClassNavForMenu}>
          Phones
        </NavLink>

        <NavLink to="/tablets" className={getClassNavForMenu}>
          Tablets
        </NavLink>

        <NavLink to="/accessories" className={getClassNavForMenu}>
          Accessories
        </NavLink>
      </div>

      <div className="menu__icons">
        <NavLink to="/favourites" className={getClassIconForMenu}>
          <img
            src="img/icons/heart-like.svg"
            alt="favourites"
            className="icon__img"
          />
        </NavLink>

        <NavLink to="/cart" className={getClassIconForMenu}>
          <img
            src="img/icons/shopping-bag.svg"
            alt="Shopping bag"
            className="icon__img"
          />
        </NavLink>
      </div>
    </div>
  );
};
