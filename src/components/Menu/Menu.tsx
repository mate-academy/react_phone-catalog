import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MenuItem } from '../../types/MenuItem';

type Props = {
  menuItems: MenuItem[];
  isActiveMenu: boolean;
  toggleMenu: () => void;
};

export const Menu: React.FC<Props> = ({
  menuItems, isActiveMenu, toggleMenu,
}) => {
  return (
    <div
      className={classNames(
        'menu',
        'App__menu',
        { 'App__menu--is-active': isActiveMenu },
      )}
    >
      <button
        type="button"
        className="menu__close"
        onClick={toggleMenu}
      >
        +
      </button>
      <ul className="menu__list">
        {menuItems.map(item => (
          <li key={item.title} className="menu__item">
            <Link
              to={item.to}
              className="menu__link"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
