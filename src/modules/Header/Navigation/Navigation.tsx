import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

interface Link {
  title: string;
  path: string;
}

interface Props {
  links: Link[];
}

export const Navigation: FC<Props> = ({ links }) => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        {links.map(({ title, path }) => (
          <li className={styles.navbar__item} key={title}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.navbar__link} ${styles['navbar__link--active']}`
                  : styles.navbar__link
              }
              to={path}
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
