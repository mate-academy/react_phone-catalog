import { Link } from 'react-router-dom';
import { IconChevronRight, IconHome } from '../Icons';
import styles from './Breadcrumbs.module.scss';

export type Crumb = {
  title: string;
  to?: string;
};

type Props = {
  items: Crumb[];
};

export const Breadcrumbs = ({ items }: Props) => (
  <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
    <Link to="/" className={styles.home} aria-label="Home">
      <IconHome className={styles.homeIcon} />
    </Link>

    {items.map(item => (
      <div className={styles.item} key={item.title}>
        <IconChevronRight className={styles.chevron} />

        {item.to ? (
          <Link to={item.to} className={styles.link}>
            {item.title}
          </Link>
        ) : (
          <span className={styles.current}>{item.title}</span>
        )}
      </div>
    ))}
  </nav>
);
