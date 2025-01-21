import styles from './Nav.module.scss';

import { NavLinkItem } from '@components/NavLinkItem';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__items}>
        <li className={styles.nav__item}>
          <NavLinkItem to="./">Home</NavLinkItem>
        </li>

        <li className={styles.nav__item}>
          <NavLinkItem to="./phones">Phones</NavLinkItem>
        </li>

        <li className={styles.nav__item}>
          <NavLinkItem to="./tablets">Tablets</NavLinkItem>
        </li>

        <li className={styles.nav__item}>
          <NavLinkItem to="./accessories">Accessories</NavLinkItem>
        </li>
      </ul>
    </nav>
  );
};
