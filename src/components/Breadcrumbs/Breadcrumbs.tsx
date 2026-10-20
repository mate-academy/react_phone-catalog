import { Link, useLocation } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  productName?: string;
};

export const Breadcrumbs = ({ productName }: Props) => {
  const { pathname } = useLocation();
  const paths = pathname.split('/').filter(p => p);

  return (
    <nav className={styles.breadcrumbs} data-cy="Breadcrumbs">
      <Link to="/" className={styles.breadcrumbs__home}>
        <img src={`${import.meta.env.BASE_URL}img/icons/home.svg`} alt="Home" />
      </Link>

      {paths.map((path, index) => {
        const isLast = index === paths.length - 1;
        const to = `/${paths.slice(0, index + 1).join('/')}`;
        const title =
          isLast && productName ? productName : path.replace(/-/g, ' ');

        return (
          <div key={path} className={styles.breadcrumbs__item}>
            <img
              src={`${import.meta.env.BASE_URL}img/icons/chevron-right.svg`}
              alt=""
            />
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
