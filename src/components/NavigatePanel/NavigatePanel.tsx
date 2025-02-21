import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './NavigatePanel.module.scss';

export const NavigatePanel = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const item = searchParams.get('item');
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Link className={styles.homeIcon} to="/">
        <img src="/img/servic/home.svg" alt="home" />
      </Link>
      <span>
        <img src="/img/servic/arrow-right.svg" alt="arrow" />
      </span>
      {location.pathname === '/favorite' && (
        <Link
          className={`${styles.category} ${!item ? styles.disabled : ''}`}
          aria-disabled={!!item}
          to={!item ? '#' : `/products?category=${category}`}
        >
          Favorite
        </Link>
      )}
      {category && (
        <Link
          className={`${styles.category} ${!item ? styles.disabled : ''}`}
          aria-disabled={!!item}
          to={!item ? '#' : `/products?category=${category}`}
        >
          {category}
        </Link>
      )}
      {item && (
        <>
          <span>
            <img src="/img/servic/arrow-right.svg" alt="arrow" />
          </span>
          <p className={styles.item}>{item}</p>
        </>
      )}
    </div>
  );
};
