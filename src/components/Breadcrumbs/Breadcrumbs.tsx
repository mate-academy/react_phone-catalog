import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import styles from './Breadcrumbs.module.scss';

interface Props {
  items: { label: string; to?: string }[];
}

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    <Link to="/" aria-label="Home">
      <Icon name="home" />
    </Link>
    {items.map(item => (
      <span className={styles.item} key={item.label}>
        <Icon name="right" />
        {item.to ? (
          <Link to={item.to}>{item.label}</Link>
        ) : (
          <span aria-current="page">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
);
