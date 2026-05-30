import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './Navbar.module.scss';

interface NavbarProps {
  isOpenMenu?: boolean;
  onCloseMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isOpenMenu, onCloseMenu }) => {
  const links = [
    { name: 'Home', route: '/' },
    { name: 'Phones', route: '/phones' },
    { name: 'Tablets', route: '/tablets' },
    { name: 'Accessories', route: '/accessories' },
  ];

  return (
    <nav className={`${s.navbar} ${isOpenMenu ? s.true : ''}`}>
      <ul className={cn(s['navbar--brand'], s.true, s['menu-open'])}>
        {links.map(link => (
          <NavLink
            to={link.route}
            key={link.route}
            className={({ isActive }) =>
              `${s.navbar__item} ${s.navbar__link} ${isActive ? s['is-active'] : ''}`
            }
            onClick={onCloseMenu}
          >
            {link.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
