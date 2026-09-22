import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const paths = pathname.split('/').filter(p => p);

  return (
    <nav className={styles.breadcrumbs} data-cy="Breadcrumbs">
      <Link to="/" className={styles.breadcrumbs__home}>
        <i className="fas fa-home"></i>
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        // Форматуємо текст: прибираємо дефіси та робимо першу літеру великою (для категорій)
        const title = path.replace(/-/g, ' ');

        return (
          <div key={path} className={styles.breadcrumbs__item}>
            <i
              className={`fas fa-chevron-right ${styles.breadcrumbs__separator}`}
            ></i>
            {isLast ? (
              <span className={styles['breadcrumbs__text--active']}>
                {title}
              </span>
            ) : (
              <Link to={to} className={styles.breadcrumbs__link}>
                {title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
