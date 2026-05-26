import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { navLinks } from '../../../../constants/navLinks';
import { Actions } from '../Actions';
import styles from './Menu.module.scss';

type MenuProps = {
  isMenuOpen: boolean;
  toggleMenu: () => void;
};

export const Menu: React.FC<MenuProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <aside
      className={cn(styles.menu, {
        [styles['menu--open']]: isMenuOpen,
      })}
    >
      <nav className={styles.menu__nav}>
        <ul className={styles.menu__list}>
          {navLinks.map(link => (
            <NavLink
              to={link.path}
              key={link.title}
              className={({ isActive }) =>
                cn(styles.menu__link, {
                  [styles['menu__link--active']]: isActive,
                })
              }
              onClick={toggleMenu}
            >
              {link.title}
            </NavLink>
          ))}
        </ul>
      </nav>

      <div className={styles.menu__bottom}>
        <Actions variant="menu" onActionClick={toggleMenu} />
      </div>
    </aside>
  );
};
