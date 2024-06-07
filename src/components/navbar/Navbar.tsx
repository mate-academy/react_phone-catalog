import { NavLink } from 'react-router-dom';
import navbarStyles from './Navbar.module.scss';
import classNames from 'classnames';

type Props = {
  onClick?: () => void;
  isOpen: boolean;
};

export const Navbar: React.FC<Props> = ({ onClick, isOpen }) => {
  const navBarLinkItems = ['home', 'phones', 'tablets', 'accessories'];

  return (
    <div
      className={classNames(navbarStyles.navbar, {
        [navbarStyles.open]: isOpen,
      })}
    >
      <ul
        className={`${isOpen ? navbarStyles.navbar__aside : navbarStyles.navbar__items}`}
      >
        {navBarLinkItems.map(item => (
          <li className={navbarStyles.navbar__item} key={item}>
            {isOpen}
            <NavLink
              to={`/${item === 'home' ? '' : item}`}
              onClick={onClick}
              className={({ isActive }) =>
                classNames(navbarStyles.navbar__itemlink, {
                  [navbarStyles.navbar__itemlink_active]: isActive,
                })
              }
            >
              {item}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
