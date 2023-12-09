import './Menu.scss';
import React, { memo, useContext } from 'react';
import { ReactSVG } from 'react-svg';
import { Link, NavLink } from 'react-router-dom';
import { FavContext } from '../../storage/FavContext';
import { CartContext } from '../../storage/CartContext';
import { NavIcon } from '../NavIcon';
import { Logo } from '../Logo';

type Props = {
  closeMenu: () => void;
};

export const Menu: React.FC<Props> = memo(({ closeMenu }) => {
  const { favProducts } = useContext(FavContext);
  const { cartItems } = useContext(CartContext);

  return (
    <aside className="menu">
      <div className="menu__top">
        <Logo />

        <div className="menu__icon-link menu__icon-link--close">
          <NavIcon>
            <ReactSVG
              src="img/icons/Close.svg"
              onClick={closeMenu}
            />
          </NavIcon>
        </div>
      </div>

      <ul className="menu__list">
        <li className="menu__item">
          <Link
            to="/"
            className="menu__link"
            onClick={closeMenu}
          >
            Home
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/phones"
            className="menu__link"
            onClick={closeMenu}
          >
            Phones
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/tablets"
            className="menu__link"
            onClick={closeMenu}
          >
            Tablets
          </Link>
        </li>

        <li className="menu__item">
          <Link
            to="/accessories"
            className="menu__link"
            onClick={closeMenu}
          >
            Accessories
          </Link>
        </li>
      </ul>

      <div className="menu__bottom">
        <NavLink
          to="/favourites"
          className="menu__icon-link menu__icon-link-after"
        >
          <NavIcon
            itemsLength={favProducts.length}
          >
            <ReactSVG
              src="img/icons/Heart.svg"
            />
          </NavIcon>
        </NavLink>

        <NavLink
          to="/cart"
          className="menu__icon-link menu__icon-link-after"
        >
          <NavIcon
            itemsLength={cartItems.length}
          >
            <ReactSVG
              src="img/icons/Shopping bag.svg"
            />
          </NavIcon>
        </NavLink>
      </div>
    </aside>
  );
});
