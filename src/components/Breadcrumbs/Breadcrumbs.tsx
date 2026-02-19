import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link to="/" className={styles.link} aria-label="Home">
          <i className="fas fa-house" />
        </Link>
      </li>

      {items.map((item, index) => (
        <li key={item.label} className={styles.item}>
          <i className={`fas fa-chevron-right ${styles.separator}`} />
          {item.to && index < items.length - 1 ? (
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
