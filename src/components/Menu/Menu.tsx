import { NavLink } from 'react-router-dom';
import './Menu.scss';
import { Icon } from '../Icon';
import { Icons } from '../../types/enums/Icons';

interface Props {
  isOpen: boolean,
  favoritesItemsCount?: number,
  cartItemsCount?: number,
  onClick: () => void,
}

export const Menu: React.FC<Props> = ({
  isOpen,
  favoritesItemsCount = 0,
  cartItemsCount = 0,
  onClick,
}) => {
  return (
    <aside
      className={`menu ${isOpen ? ' menu--active' : ''}`}
    >
      <div className="menu__content">
        <NavLink to="/"><span className="header__logo" /></NavLink>
        <ul className="menu__list">
          <li className="menu__item">
            <NavLink
              to="/"
              onClick={onClick}
            >
              Home
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="phones" onClick={onClick}>Phones</NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="tablets">Tablets</NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="accessories">Accessories</NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/favorites" className="menu__link">
              <p>Favorites</p>
              <Icon icon={Icons.Heart} counter={favoritesItemsCount} />
            </NavLink>
          </li>
          <li className="menu__item">
            <NavLink
              to="/cart"
              className="menu__link"
            >
              <p>Cart</p>
              <Icon icon={Icons.Cart} counter={cartItemsCount} />
            </NavLink>
          </li>

        </ul>
      </div>
    </aside>
  );
};
