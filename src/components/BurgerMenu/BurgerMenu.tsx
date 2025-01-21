import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo/logo';
import {
  getClassIconForMenu,
  getClassNavForMenu,
} from '../../utils/getLinkClass';
import { useContext } from 'react';
import { StateContext } from '../../store/GlobalProvider';

type Props = {
  toggleMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ toggleMenu }) => {
  const { favourites, cart, calculateTotalItems } = useContext(StateContext);

  return (
    <div className="menu">
      <header className="header">
        <Logo classN={'logo__header'} />

        <div className="header__menu-container">
          <button className="header__icon icon" onClick={toggleMenu}>
            <img
              src="img/icons/close.svg"
              alt="menu"
              className="icon__img icon__img-scale"
            />
          </button>
        </div>
      </header>

      <div className="menu__nav-list">
        <NavLink to="/" className={getClassNavForMenu} onClick={toggleMenu}>
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={getClassNavForMenu}
          onClick={toggleMenu}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={getClassNavForMenu}
          onClick={toggleMenu}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={getClassNavForMenu}
          onClick={toggleMenu}
        >
          Accessories
        </NavLink>
      </div>

      <div className="menu__icons">
        <NavLink
          to="/favourites"
          className={getClassIconForMenu}
          onClick={toggleMenu}
        >
          {favourites.length > 0 ? (
            <div className="header__scale">
              <img
                src="img/icons/heart-like.svg"
                alt="favourites"
                className="icon__img"
              />
              <div className="icon__count">
                <p className="icon__count-number">{favourites.length}</p>
              </div>
            </div>
          ) : (
            <img
              src="img/icons/heart-like.svg"
              alt="favourites"
              className="icon__img icon__img-scale"
            />
          )}
        </NavLink>

        <NavLink
          to="/cart"
          className={getClassIconForMenu}
          onClick={toggleMenu}
        >
          {cart.length > 0 ? (
            <div className="header__scale">
              <img
                src="img/icons/shopping-bag.svg"
                alt="Shopping bag"
                className="icon__img"
              />
              <div className="icon__count">
                <p className="icon__count-number">{calculateTotalItems()}</p>
              </div>
            </div>
          ) : (
            <img
              src="img/icons/shopping-bag.svg"
              alt="Shopping bag"
              className="icon__img icon__img-scale"
            />
          )}
        </NavLink>
      </div>
    </div>
  );
};
