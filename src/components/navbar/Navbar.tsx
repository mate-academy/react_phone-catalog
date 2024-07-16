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
    ? [
        { name: 'home', url: '/' },
        { name: 'phones', url: '/phones' },
        { name: 'tablets', url: '/tablets' },
        { name: 'accessories', url: '/accessories' },
      ]
    : [
        { name: 'github', url: 'https://github.com/ivan-baranovskyi' },
        { name: 'contacts', url: '/contacts' },
        { name: 'rights', url: '/rights' },
      ];

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
          <li className={navbarStyles.navbar__item} key={item.name}>
            {isOpen}
            <NavLink
              to={item.url}
              onClick={onClick}
              className={({ isActive }) =>
                classNames(navbarStyles.navbar__itemlink, {
                  [navbarStyles.navbar__itemlink_active]:
                    isActive && !withoutUnderline,
                })
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
