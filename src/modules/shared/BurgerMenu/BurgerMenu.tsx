import { FC } from 'react';
import { LINKS } from '../../../variables/navLinks';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useGlobalState } from '../../../context/store';

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.navLink, { [styles.navLinkActive]: isActive });

const getIconLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames(styles.iconLink, { [styles.iconLinkActive]: isActive });

export const BurgerMenu: FC = () => {
  const { setIsMenuOpen, carts, favourites } = useGlobalState();

  return (
    <aside>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {LINKS.map(link => (
            <li key={link.title} className={styles.navListItem}>
              <NavLink
                to={link.path}
                className={getNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.iconsWrapper}>
        <div className={styles.icon}>
          <NavLink
            to="/favourites"
            className={getIconLinkClass}
            onClick={() => setIsMenuOpen(false)}
          ></NavLink>

          {favourites.length > 0 && (
            <span className={styles.itemsAmount}></span>
          )}
        </div>

        <div className={styles.icon}>
          <NavLink
            to="/carts"
            className={getIconLinkClass}
            onClick={() => setIsMenuOpen(false)}
          ></NavLink>

          {carts.length > 0 && <span className={styles.itemsAmount}></span>}
        </div>
      </div>
    </aside>
  );
};
