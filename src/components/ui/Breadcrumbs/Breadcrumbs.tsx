import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ChevronRight } from 'lucide-react';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const pathnames = pathname.split('/').filter(x => x);

  return (
    <nav aria-label="breadcrumb" className={styles.container}>
      <ul className={styles.breadcrumbs}>
        <li className={styles.item}>
          <Link to="/" className={styles.link}>
            <Home size={16} strokeWidth={2} />
          </Link>
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className={styles.item}>
              <ChevronRight size={16} className={styles.separator} />

              {last ? (
                <span className={styles.current}>
                  {t(`breadcrumbs.${value}`, value)}
                </span>
              ) : (
                <Link to={to} className={styles.link}>
                  {t(`breadcrumbs.${value}`, value)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
