import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './ListOfTextLinks.module.scss';

export const ListOfTextLinks = () => {
  function getLinkClass({ isActive }: { isActive: boolean }) {
    return classNames('link', styles.textLink, {
      [styles.textLinkActive]: isActive,
    });
  }

  return (
    <ul className={styles.textList}>
      <li className={styles.navItem}>
        <NavLink to={'/'} className={getLinkClass}>
          home
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to={'/phones'} className={getLinkClass}>
          Phones
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to={'/tablets'} className={getLinkClass}>
          tablets
        </NavLink>
      </li>
      <li className={styles.navItem}>
        <NavLink to={'/accessories'} className={getLinkClass}>
          accessories
        </NavLink>
      </li>
    </ul>
  );
};
