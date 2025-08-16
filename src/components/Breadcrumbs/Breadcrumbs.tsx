import { useTheme } from '../../context/ThemeContext';
import styles from './Breadcrumbs.module.scss';

import { Link, useLocation } from 'react-router-dom';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const parts = pathname.split('/').filter(Boolean);

  const { theme } = useTheme();

  const getDisplayName = (segment: string) => {
    return decodeURIComponent(
      segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
    );
  };

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.breadcrumbs__icon} aria-label="Home">
        <img src={`/img/icons/icon-home-${theme}.svg`} />
      </Link>

      {parts.map((segment, index) => {
        const to = '/' + parts.slice(0, index + 1).join('/');
        const isLast = index === parts.length - 1;

        return (
          <span key={to} className={styles.breadcrumbs__container}>
            <span className={styles.breadcrumbs__separator}></span>

            {isLast ? (
              <span
                className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--active']}`}
              >
                {getDisplayName(segment)}
              </span>
            ) : (
              <Link to={to} className={styles.breadcrumbs__item}>
                {getDisplayName(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
