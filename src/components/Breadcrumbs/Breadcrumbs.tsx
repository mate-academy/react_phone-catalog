import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation().pathname;
  const path = [
    'home',
    ...location.split('/').filter(segment => segment !== ''),
  ];

  return (
    <ul className={styles.breadcrumbs}>
      {path.map((point, index) => {
        const to = '/' + path.slice(1, index + 1).join('/');
        const className = () => {
          if (point === 'home') {
            return classNames(
              styles.breadcrumbs__icon,
              styles['breadcrumbs__icon--home'],
            );
          } else {
            return styles.breadcrumbs__text;
          }
        };

        return (
          <li className={styles.breadcrumbs__crumb} key={point}>
            <NavLink to={to} className={className}>
              {point === 'home'
                ? ''
                : point.charAt(0).toUpperCase() + point.slice(1)}
            </NavLink>
            {index < path.length - 1 && (
              <span
                className={classNames(
                  styles.breadcrumbs__icon,
                  styles['breadcrumbs__icon--separator'],
                )}
              ></span>
            )}
          </li>
        );
      })}
    </ul>
  );
};
