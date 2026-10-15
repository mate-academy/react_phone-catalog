import styles from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom';

type BreadcrumbItem = {
  label: string | undefined;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs: React.FC<Props> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__list}>
        <li className={styles.breadcrumbs__item}>
          <Link to="/" className={styles.breadcrumbs__home} aria-label="Home">
            <span className={styles.breadcrumbs__homeIcon}></span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.label}-${index}`}
              className={styles.breadcrumbs__item}
            >
              <span className={styles.breadcrumbs__separator}></span>

              {item.to && !isLast ? (
                <Link to={item.to} className={styles.breadcrumbs__link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles.breadcrumbs__current}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
