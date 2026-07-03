import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

type Props = {
  isOpen?: boolean;
};

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/phones', label: 'Phones', end: false },
  { to: '/tablets', label: 'Tablets', end: false },
  { to: '/accessories', label: 'Accessories', end: false },
];

export const Navbar = ({ isOpen = false }: Props) => (
  <nav data-cy="nav" className={cn(styles.nav, { [styles.navOpen]: isOpen })}>
    <ul className={styles.list}>
      {LINKS.map(({ to, label, end }) => (
        <li key={to} className={styles.item}>
          <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(styles.link, { [styles.linkActive]: isActive })
            }
          >
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
