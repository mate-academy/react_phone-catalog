import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category?: string;
  productName?: string;
};

export const Breadcrumbs = ({ category, productName }: Props) => {
  const { pathname } = useLocation();
  const paths =
    category && productName
      ? [category, productName]
      : pathname.split('/').filter(p => p);

  return (
    <nav className={styles.breadcrumbs} data-cy="Breadcrumbs">
      <Link to="/" className={styles.breadcrumbs__home}>
        <img
          src="img/icons/home.svg"
          alt="Home"
          className={styles['breadcrumbs__home-icon']}
        />
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        const title =
          isLast && productName
            ? productName
            : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');

        return (
          <div key={path} className={styles.breadcrumbs__item}>
            <img src="img/icons/chevron-right.svg" alt="" />
            {isLast ? (
              <span className={styles.breadcrumbs__current}>{title}</span>
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
