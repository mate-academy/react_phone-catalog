import { NavLink } from 'react-router-dom';
import FavoriteIcon from '../../img/favorites-icon.png';
import CartIcon from '../../img/cart-icon.png';
import './Sidebar.scss';

type Props = {
  isOpen: boolean;
};

export const Sidebar: React.FC<Props> = ({ isOpen }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <ul className="sidebar__list">
        <li className="sidebar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'sidebar__link is-active' : 'sidebar__link'
            }
          >
            Home
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/phones"
            className={({ isActive }) =>
              isActive ? 'sidebar__link is-active' : 'sidebar__link'
            }
          >
            Phones
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              isActive ? 'sidebar__link is-active' : 'sidebar__link'
            }
          >
            Tablets
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              isActive ? 'sidebar__link is-active' : 'sidebar__link'
            }
          >
            Accessories
          </NavLink>
        </li>
      </ul>
      <div className="sidebar__icons">
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? 'sidebar__icon is-active' : 'sidebar__icon'
          }
        >
          <img src={FavoriteIcon} alt="favorite-icon" />
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? 'sidebar__icon is-active' : 'sidebar__icon'
          }
        >
          <img src={CartIcon} alt="cart-icon" />
        </NavLink>
      </div>
    </aside>
  );
};
