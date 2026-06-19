import { NavLink } from 'react-router-dom';
import styles from './HeaderBurgerMenu.module.scss';
import { Dispatch, SetStateAction } from 'react';
// import { asset } from '../../../utils/paths';
import { HeaderActions } from '../HeaderActions/HeaderActions';

type Props = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export const HeaderBurgerMenu: React.FC<Props> = ({ setIsMenuOpen }) => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <aside className={`${styles.mobileMenu}`}>
      <nav className={`${styles.mobileNav}`}>
        <ul className={`${styles.mobileNavList} ${styles.nav__list}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Phones
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Tablets
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                `${styles.nav__link} ${isActive ? styles.active : ''}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accessories
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.mobileActions}>
        <HeaderActions favouritesCount={12} cartCount={5} />
      </div>
    </aside>
  );
};
