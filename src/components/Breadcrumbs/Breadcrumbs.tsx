import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    <Link to="/" className={styles.breadcrumbs__link} aria-label="Home">
      <Icon name="home" />
    </Link>

    {items.map(({ label, to }) => (
      <span key={label} className={styles.breadcrumbs__item}>
        <Icon name="arrow-right" />
        {to ? (
          <Link to={to} className={styles.breadcrumbs__link}>
            {label}
          </Link>
        ) : (
          <span className={styles.breadcrumbs__current}>{label}</span>
        )}
      </span>
    ))}
  </nav>
);
