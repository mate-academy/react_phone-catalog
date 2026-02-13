import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import styles from './mainNavigation.module.scss';
import { navLinks } from '../../model';

type Props = {
  closeMenu: () => void;
};

export const MainNavigation = ({ closeMenu }: Props) => {
  const location = useLocation();

  return (
    <nav aria-label="main navigation">
      <ul className={styles['main-navigation']}>
        {navLinks.map(link => {
          const isActive = location.pathname === link.to;

          return (
            <li className={styles.listitem} key={link.to}>
              <Link
                className={classNames(styles.link, {
                  [styles['link--active']]: isActive,
                })}
                to={link.to}
                {...(isActive && { 'aria-current': 'page' })}
                onClick={closeMenu}
              >
                {link.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
