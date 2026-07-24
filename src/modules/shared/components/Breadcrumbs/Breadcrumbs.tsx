import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

interface Crumb {
  label: string;
  to?: string;
}

interface Props {
  items: Crumb[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
    <Link to="/" className={styles.home} aria-label="Home">
      <Icon name="home" />
    </Link>

    {items.map(item => (
      <span key={item.label} className={styles.item}>
        <Icon name="arrow-right" className={styles.separator} />
        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.label}
          </Link>
        ) : (
          <span className={styles.current}>{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);
