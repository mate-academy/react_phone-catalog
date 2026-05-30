import { NavLink } from 'react-router-dom';
import './Menu.scss';
import { links } from '../../constants/common';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

type MenuProps = {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Menu: React.FC<MenuProps> = ({ setIsMenuOpen }) => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const cart = useSelector((state: RootState) => state.cart);

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <aside className="menu page__menu">
      <div className="menu-slide-in active">
        <nav className="menu__nav nav">
          <ul className="nav__list nav__list--menu">
            {links.map((link, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    classNames('nav__link', { active: isActive })
                  }
                  onClick={handleCloseMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <footer className="footer page__footer">
        <ul className="footer__actions">
          <li className="footer__actions-item footer__actions-item--favourite">
            <NavLink
              to="favorites"
              className={({ isActive }) =>
                classNames('icon', 'icon--favourite', { active: isActive })
              }
              onClick={handleCloseMenu}
            >
              {favorites.length > 0 && (
                <span className="favorite-count">{favorites.length}</span>
              )}
              <img src="./img/icons/favourites.svg" alt="favorite" />
            </NavLink>
          </li>

          <li className="footer__actions-item footer__actions-item--cart">
            <NavLink
              to="cart-page"
              className={({ isActive }) =>
                classNames('icon', 'icon--cart', { active: isActive })
              }
              onClick={handleCloseMenu}
            >
              {cart.length > 0 && (
                <span className="favorite-count">{cart.length}</span>
              )}
              <img src="./img/icons/shopping-bag.svg" alt="shopping-bag" />
            </NavLink>
          </li>
        </ul>
      </footer>
    </aside>
  );
};
