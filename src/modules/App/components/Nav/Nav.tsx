import styles from './Nav.module.scss';

import { NavLinkItem } from '@components/NavLinkItem';

import { LINKS } from '@App/constants/Links';

export const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__items}>
        {LINKS.map(link => (
          <li key={link[0]}>
            <NavLinkItem to={link[0]}>{link[1]}</NavLinkItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};
