import { NavLink } from 'react-router-dom';
import navbarStyles from './Navbar.module.scss';
import classNames from 'classnames';

type Props = {
  onClick?: () => void;
  isOpen: boolean;
  withoutUnderline?: boolean;
};

export const Navbar: React.FC<Props> = ({
  onClick,
  isOpen,
  withoutUnderline,
}) => {
  const navBarLinkItems = !withoutUnderline
    ? ['home', 'phones', 'tablets', 'accessories']
    : ['github', 'contacts', 'rights'];

  return (
    <div
      className={classNames(navbarStyles.navbar, {
        [navbarStyles.open]: isOpen,
        [navbarStyles.footer]: withoutUnderline,
      })}
    >
      <ul
        className={`${isOpen && !withoutUnderline ? navbarStyles.navbar__aside : ''} ${withoutUnderline ? navbarStyles.navbar__footer_ul : navbarStyles.navbar__items}`}
      >
        {navBarLinkItems.map(item => (
          <li className={navbarStyles.navbar__item} key={item}>
            {isOpen}
            <NavLink
              to={`/${item === 'home' ? '' : item}`}
              onClick={onClick}
              className={({ isActive }) =>
                classNames(navbarStyles.navbar__itemlink, {
                  [navbarStyles.navbar__itemlink_active]:
                    isActive && !withoutUnderline,
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
