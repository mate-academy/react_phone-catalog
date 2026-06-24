import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <ol className={styles.list}>
      {items.map(item => (
        <li key={`${item.label}-${item.to ?? 'current'}`}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
