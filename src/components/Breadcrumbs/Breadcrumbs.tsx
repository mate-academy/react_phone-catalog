import { Link } from 'react-router-dom';
import iconHome from '../../assets/icon-home.svg';
import styles from './Breadcrumbs.module.scss';

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => (
  <nav className={styles.wrap}>
    <Link to="/" className={styles.home} aria-label="Home">
      <img src={iconHome} alt="" />
    </Link>
    {crumbs.map((c, i) => (
      <span key={i} className={styles.item}>
        <span className={styles.sep}>›</span>
        {c.to ? (
          <Link to={c.to} className={styles.link}>
            {c.label}
          </Link>
        ) : (
          <span className={styles.current}>{c.label}</span>
        )}
      </span>
    ))}
  </nav>
);
