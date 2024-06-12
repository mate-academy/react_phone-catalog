import styles from './Breadcrumbs.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../utils/const';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const breadcrumbs = pathname.split('/').filter(x => x);
  let breadcrumbPath = '';

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/" className={styles.homeLink}>
        <img
          src={`${BASE_URL}/icons/Home.svg`}
          alt="Home"
          className={styles.icon}
        />
      </Link>
      {breadcrumbs.map((name, index) => {
        breadcrumbPath += `/${name}`;
        const isLast = index === breadcrumbs.length - 1;

        return (
          <span key={breadcrumbPath} className={styles.breadcrumbItem}>
            <img
              src={`${BASE_URL}/icons/ArrowRight.svg`}
              alt="ArrowRight"
              className={styles.arrow}
            />
            {isLast ? (
              <span className={styles.current}>{name.replace(/-/g, ' ')}</span>
            ) : (
              <Link to={breadcrumbPath} className={styles.link}>
                {name.replace(/-/g, ' ')}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
