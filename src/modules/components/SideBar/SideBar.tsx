import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.scss';
import { Action } from '../../Header/Actions';
import { useEffect } from 'react';

interface Props {
  links: { title: string; path: string }[];
  burgerOpen: boolean;
}

export const SideBar: FC<Props> = ({ links, burgerOpen }) => {
  useEffect(() => {
    if (burgerOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [burgerOpen]);

  return (
    <aside
      className={`${styles.sidebar} ${burgerOpen ? styles['sidebar__menu--open'] : ''}`}
    >
      <nav
        className={`${styles.sidebar__nav} ${
          burgerOpen ? styles['sidebar__menu--open'] : ''
        }`}
      >
        <ul className={styles.sidebar__list}>
          {links.map(({ title, path }) => (
            <li className={styles.sidebar__item} key={title}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${styles.sidebar__link} ${styles['sidebar__link--active']}`
                    : styles.sidebar__link
                }
                to={path}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Action />
    </aside>
  );
};
