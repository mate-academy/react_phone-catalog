/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NavBar } from '../NavBar';
import './Menu.scss';

type Props = {
  toggleMenu: () => void,
};

export const Menu: React.FC<Props> = ({ toggleMenu }) => (
  <aside className="App__menu menu">
    <div className="menu__content">
      <div className="menu__top-bar">
        <NavLink
          className="menu__logo-link"
          to="/"
        >
          <div className="menu__logo icon-logo" />
        </NavLink>

        <button
          onClick={toggleMenu}
          className="menu__btn-close"
        >
          <div className="icon icon__close" />
        </button>
      </div>

      <NavBar toggleMenu={toggleMenu} />

      <div className="menu__favorites-cart">
        <NavLink
          className={classNames('menu__favorites-cart-link')}
          to="/favorites"
        >
          <div className="menu__favorites-icon icon icon__favorites" />
        </NavLink>

        <NavLink
          className={classNames('menu__favorites-cart-link')}
          to="/cart"
        >
          <div className="menu__favorites-icon icon icon__cart" />
        </NavLink>
      </div>
    </div>
  </aside>
);
