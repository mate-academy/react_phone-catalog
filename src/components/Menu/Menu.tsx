/* eslint-disable react/button-has-type */
import { useContext } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { NavBar } from '../NavBar';
import './Menu.scss';
import { ProductsContext } from '../ProductsContext';

type Props = {
  toggleMenu: () => void,
};

export const Menu: React.FC<Props> = ({ toggleMenu }) => {
  const { favorites, carts } = useContext(ProductsContext);

  return (
    <aside className="App__menu menu">
      <div className="menu__content">
        <div className="menu__top-bar">
          <NavLink
            className="menu__logo"
            to="/"
          >
            <div className="icon-logo" />
          </NavLink>

          <button
            onClick={toggleMenu}
            className="menu__btn-close"
          >
            <div className="icon icon__close" />
          </button>
        </div>

        <NavBar toggleMenu={toggleMenu} />

        <div className="menu__favorites-cart-wrapper">
          <NavLink
            onClick={toggleMenu}
            className={({ isActive }) => (
              classNames('menu__link', {
                'menu__link--is-active': isActive,
              })
            )}
            to="/favorites"
          >
            <div className="icon icon__favorites">
              <div
                className={classNames(
                  'icon__label-count',
                  {
                    'icon__label-count--display-none':
                      favorites.length === 0,
                  },
                )}
              >
                {favorites.length}
              </div>
            </div>
          </NavLink>

          <NavLink
            onClick={toggleMenu}
            className={({ isActive }) => (
              classNames('menu__link', {
                'menu__link--is-active': isActive,
              })
            )}
            to="/cart"
          >
            <div className="icon icon__cart">
              <div
                className={classNames(
                  'icon__label-count',
                  {
                    'icon__label-count--display-none':
                      carts.length === 0,
                  },
                )}
              >
                {carts.length}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
