import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  crumbs: Crumb[];
}

export const Breadcrumbs = ({ crumbs }: Props) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <Link to="/" className={styles.home}>
        <img src="img/icons/home.svg" alt="Home" width="16" height="16" />
      </Link>

      {crumbs.map(crumb => (
        <span key={crumb.label} className={styles.item}>
          <img src="img/icons/arrow-right.svg" alt="" width="16" height="16" />

          {crumb.to ? (
            <Link to={crumb.to} className={styles.link}>
              {crumb.label}
            </Link>
          ) : (
            <span className={styles.current}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};
