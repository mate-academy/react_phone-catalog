import styles from './NavigationMobile.module.scss';
import { NavLinkItem } from '../NavLinkItem';
import { navLinks } from '../../constantas/navLinks';

export const NavigationMobile = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        {navLinks.slice(0, 4).map(linkItem => {
          return (
            <li className={styles.nav__item} key={linkItem.path}>
              <NavLinkItem path={linkItem.path} text={linkItem.text} />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
