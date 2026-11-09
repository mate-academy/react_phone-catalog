import classNames from 'classnames';
import { Link } from 'react-router-dom';
import HomeIcon from '../../../../assets/icons/home.svg?react';
import ArrowRightIcon from '../../../../assets/icons/arrow-right.svg?react';
import styles from './Breadcrumbs.module.scss';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs = ({ items, className }: Props) => (
  <nav
    className={classNames(styles.breadcrumbs, className)}
    aria-label="Breadcrumb"
  >
    <ol className={styles.list}>
      <li className={styles.item}>
        <Link to="/" className={styles.homeLink} aria-label="Home">
          <HomeIcon />
        </Link>
      </li>

      {items.map(({ label, to }) => (
        <li key={label} className={styles.item}>
          <ArrowRightIcon className={styles.separator} aria-hidden="true" />

          {to ? (
            <Link to={to} className={styles.link}>
              {label}
            </Link>
          ) : (
            <span className={styles.current} aria-current="page">
              {label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
