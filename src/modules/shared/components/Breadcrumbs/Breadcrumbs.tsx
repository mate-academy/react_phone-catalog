import { Link } from 'react-router-dom';
import { IconHome, IconChevronArrowRight } from '../Icons';
import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps): JSX.Element {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link to="/" className={styles.link} aria-label="Home">
            <IconHome className={styles.icon} />
          </Link>
        </li>
        {items.map(item => (
          <li key={item.label} className={styles.item}>
            <IconChevronArrowRight
              className={styles.separator}
              aria-hidden="true"
            />
            {item.to ? (
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
