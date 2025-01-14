import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter(x => x);

  return (
    <nav className={styles.breadcrumbs}>
      <Link to="/">
        <div>
          <img src="/img/icons/home.svg" alt="home" />
        </div>
      </Link>

      <div>
        <img src="/img/icons/arrow-forward-disabled.svg" alt="arrow" />
      </div>

      {pathnames.map((name, index) => {
        const isLast = index === pathnames.length - 1;

        return (
          <span
            key={name}
            className={`${styles.breadcrumbItem} ${isLast ? styles.lastBreadcrumb : ''}`}
          >
            {isLast ? (
              name
            ) : (
              <>
                <Link to={`/${name}`}>{name}</Link>
                <div>
                  <img
                    src="/img/icons/arrow-forward-disabled.svg"
                    alt="arrow"
                  />
                </div>
              </>
            )}
          </span>
        );
      })}
    </nav>
  );
};
