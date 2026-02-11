import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

export const Breadcrumbs: React.FC<Props> = ({ items }) => (
  <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <div key={item.label} className={styles.item}>
          {item.to && !isLast ? (
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
          {!isLast && <span className={styles.separator}>/</span>}
        </div>
      );
    })}
  </nav>
);
