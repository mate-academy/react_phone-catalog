import { Link } from 'react-router-dom';
import styles from './Breadcrumbs.module.scss';

type Props = {
  category: string;
  endpoint?: string;
};

export const Breadcrumbs: React.FC<Props> = ({ category, endpoint }) => {
  return (
    <ul className={styles.breadcrumbs}>
      <li
        className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--home']}`}
      >
        <Link to="/">
          <img
            className={styles.breadcrumbs__icon}
            src="img/icons/home.svg"
            alt="home icon"
          />
        </Link>
      </li>
      <li
        className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--category']}`}
      >
        <Link to={`/${category}`} className={styles.breadcrumbs__link}>
          {category}
        </Link>
      </li>
      {endpoint && (
        <li
          className={`${styles.breadcrumbs__item} ${styles['breadcrumbs__item--endpoint']}`}
        >
          {endpoint}
        </li>
      )}
    </ul>
  );
};
