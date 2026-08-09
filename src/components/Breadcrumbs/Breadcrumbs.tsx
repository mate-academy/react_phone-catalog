import { Link } from 'react-router-dom';

import styles from './Breadcrumbs.module.scss';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: Props) => {
  return (
    <nav className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <span key={item.label}>
          {item.path ? (
            <Link to={item.path}>
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}

          {index < items.length - 1 && (
            <span className={styles.separator}>
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};
