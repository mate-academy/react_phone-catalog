import { Link } from 'react-router-dom';

import { Icon } from '../Icon';
import { useTranslation } from '../../hooks';
import styles from './Breadcrumbs.module.scss';

export type BreadcrumbItem = {
  label: string;
  path?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: Props) => {
  const t = useTranslation();

  return (
    <nav className={styles.breadcrumbs} aria-label={t.common.breadcrumbs}>
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link className={styles.homeLink} to="/" aria-label={t.common.home}>
            <Icon name="home" size={16} />
          </Link>
        </li>

        {items.map(({ label, path }, index) => {
          const isLast = index === items.length - 1;

          return (
            <li className={styles.item} key={`${label}-${path || index}`}>
              <Icon
                name="chevronRight"
                size={16}
                className={styles.separator}
              />

              {path && !isLast ? (
                <Link className={styles.link} to={path}>
                  {label}
                </Link>
              ) : (
                <span className={styles.current} aria-current="page">
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
