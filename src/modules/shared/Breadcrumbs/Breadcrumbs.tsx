import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

const labelMap: Record<string, string> = {
  home: 'Home',
  phones: 'Phones',
  tablets: 'Tablets',
  accessories: 'Accessories',
  favourites: 'Favourites',
};

export const Breadcrumbs = () => {
  const { state } = useLocation();
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/home" className={styles.breadcrumbs__item}>
        <img src="/img/icons/home.svg" alt="home" />
      </Link>

      {segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        let label: string;

        if (isLast && state?.productName) {
          label = state.productName;
        } else {
          label = labelMap[segment] ?? segment;
        }

        return (
          <span key={path} className={styles.breadcrumbs__segment}>
            <span className={styles.breadcrumbs__separator}></span>
            {isLast ? (
              <span className={styles.breadcrumbs__current}>{label}</span>
            ) : (
              <Link to={path} className={styles.breadcrumbs__item}>
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};
