import { NavLink } from 'react-router-dom';
import styles from '../Header.module.scss';
import cs from 'classnames';

type Props = {
  isMenuOpen: boolean;
  closeMenu: () => void;
};

export const BurgerMenu: React.FC<Props> = ({ isMenuOpen, closeMenu }) => {
  return (
    <div className={cs(styles.burgerMenu, { [styles.isOpen]: isMenuOpen })}>
      <nav className={styles.burgerNav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            cs(styles.burgerLink, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Home
        </NavLink>

        <NavLink
          to="/phones"
          className={({ isActive }) =>
            cs(styles.burgerLink, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Phones
        </NavLink>

        <NavLink
          to="/tablets"
          className={({ isActive }) =>
            cs(styles.burgerLink, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Tablets
        </NavLink>

        <NavLink
          to="/accessories"
          className={({ isActive }) =>
            cs(styles.burgerLink, {
              [styles.active]: isActive,
            })
          }
          onClick={closeMenu}
        >
          Accessories
        </NavLink>
      </nav>
    </div>
  );
};
