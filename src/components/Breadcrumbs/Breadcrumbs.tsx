import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbItem = {
  title: string;
  href?: string;
};

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumbs" className={styles.breadcrumbs}>
    {items.map((item, index) => (
      <span key={item.title} className={styles.breadcrumbItem}>
        {item.href ? (
          <Link to={item.href}>{item.title}</Link>
        ) : (
          <span>{item.title}</span>
        )}
        {index < items.length - 1 && (
          <span className={styles.separator}>/</span>
        )}
      </span>
    ))}
  </nav>
);
