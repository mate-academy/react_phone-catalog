import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    {items.map((item, index) => (
      <span key={item.label} className={styles.item}>
        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current}>{item.label}</span>
        )}

        {index < items.length - 1 && <span className={styles.sep}>/</span>}
      </span>
    ))}
  </nav>
);
