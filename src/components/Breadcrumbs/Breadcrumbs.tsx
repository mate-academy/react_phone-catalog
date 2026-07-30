import { Link } from 'react-router-dom';
import { Icon } from '@/components/Icon';
import styles from './Breadcrumbs.module.scss';

export type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  crumbs: Crumb[];
};

export const Breadcrumbs = ({ crumbs }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link to="/" className={styles.homeLink} aria-label="Home page">
          <Icon name="home" />
        </Link>
      </li>

      {crumbs.map(crumb => (
        <li key={crumb.label} className={styles.item}>
          <Icon name="chevron-right" className={styles.separator} />

          {crumb.to ? (
            <Link to={crumb.to} className={styles.link}>
              {crumb.label}
            </Link>
          ) : (
            <span className={styles.current}>{crumb.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
