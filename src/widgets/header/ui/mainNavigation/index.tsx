import { navLinksList } from '@widgets/header/model';
import styles from '../../styles/mainNavigation.module.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const getClassName = ({ isActive }: { isActive: boolean }) =>
  classNames(styles['nav-item__link'], {
    [styles['nav-item__link--active']]: isActive,
  });

export const HeaderMainNavigation = () => {
  return (
    <nav aria-label="main navigation">
      <ul className={styles['main-navigation']}>
        {navLinksList.map(link => (
          <li key={link.path} className={`${styles['nav-item']}`}>
            <NavLink
              className={getClassName}
              to={link.path}
              aria-label={link.ariaLabel}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
