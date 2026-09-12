import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, ArrowRightIcon } from '../Icons/Icons';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  /** Omit for the last crumb, which is plain text. */
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      <Link to="/" className={styles.home} aria-label="Home">
        <HomeIcon size={16} />
      </Link>

      {items.map(item => (
        <Fragment key={item.label}>
          <ArrowRightIcon size={12} className={styles.separator} />

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
};
