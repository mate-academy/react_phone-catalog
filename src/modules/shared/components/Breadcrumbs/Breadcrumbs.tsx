import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav aria-label="Breadcrumb">
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link to="/" className={styles.home} aria-label="Home">
          <Icon name="home" />
        </Link>
      </li>

      {items.map(({ label, to }, index) => {
        const isLast = index === items.length - 1;

        return (
          <li key={label} className={styles.item}>
            <Icon name="chevron-right" className={styles.separator} />

            {to && !isLast ? (
              <Link to={to} className={styles.link}>
                {label}
              </Link>
            ) : (
              <span className={styles.current} aria-current="page">
                {label}
              </span>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);
