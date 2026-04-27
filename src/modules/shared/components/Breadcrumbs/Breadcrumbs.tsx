import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    {items.map((item, index) => (
      <Fragment key={`${item.label}-${index}`}>
        {index > 0 && <span className={styles.separator}>/</span>}
        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current}>{item.label}</span>
        )}
      </Fragment>
    ))}
  </nav>
);
