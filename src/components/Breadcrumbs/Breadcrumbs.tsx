import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => (
  <nav className={styles.breadcrumbs} data-cy="breadCrumbs">
    <Link to="/" className={styles.breadcrumbs__home}>
      <img src="img/icons/home.svg" alt="Home" />
    </Link>

    {items.map(({ label, to }) => (
      <span key={label} className={styles.breadcrumbs__item}>
        <img
          src="img/icons/arrow-right.svg"
          alt=">"
          className={styles.breadcrumbs__separator}
        />

        {to ? (
          <Link to={to} className={styles.breadcrumbs__link}>
            {label}
          </Link>
        ) : (
          <span className={styles.breadcrumbs__current}>{label}</span>
        )}
      </span>
    ))}
  </nav>
);
