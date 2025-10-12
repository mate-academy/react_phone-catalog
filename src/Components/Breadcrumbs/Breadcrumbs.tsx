import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();

  const parts = location.pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/" className={styles.home}></Link>

      {parts.map((part, index) => {
        const path = '/' + parts.slice(0, index + 1).join('/');
        const isLast = index === parts.length - 1;
        const capitalize = part.charAt(0).toUpperCase() + part.slice(1);

        return (
          <span key={path} className={styles.part}>
            <span className={styles.separator}></span>
            {isLast ? (
              <span className={styles.current}>{capitalize}</span>
            ) : (
              <Link to={path}>{capitalize}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
