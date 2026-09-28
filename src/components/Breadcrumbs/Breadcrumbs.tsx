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
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    <Link to="/" className={styles.homeLink} aria-label="Home">
      <i className="fa-solid fa-house" />
    </Link>

    {items.map(item => (
      <span className={styles.item} key={item.label}>
        <i className="fa-solid fa-chevron-right" />

        {item.to ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span>{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);
