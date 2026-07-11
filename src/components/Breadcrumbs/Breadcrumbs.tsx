import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(Boolean);
  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to="/" className={styles.homeIcon} />

      {pathnames.map((path, index) => {
        const isLast = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return (
          <span key={to} className={styles.item}>
            <span key={to} className={styles.arrowIcon} />

            {isLast ? (
              <span className={styles.title}>{capitalize(path)}</span>
            ) : (
              <Link to={to} className={styles.link}>
                {capitalize(path)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
