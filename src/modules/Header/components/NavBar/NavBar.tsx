import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { HOME, PHONES, TABLETS, ACCESSORIES } from '../../../../utils/routes';
import styles from './NavBar.module.scss';
import { getActiveLinkClass } from '../../../../utils/getActiveNavLink';
import { useMenu } from '../../../../contexts/MenuProvider';

export const NavBar: FC = () => {
  const { toggleMenu } = useMenu();
  const isActiveLink = getActiveLinkClass(styles);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to={HOME} className={isActiveLink} onClick={toggleMenu}>
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={PHONES} className={isActiveLink} onClick={toggleMenu}>
            Phones
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to={TABLETS} className={isActiveLink} onClick={toggleMenu}>
            Tablets
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to={ACCESSORIES}
            className={isActiveLink}
            onClick={toggleMenu}
          >
            Accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
