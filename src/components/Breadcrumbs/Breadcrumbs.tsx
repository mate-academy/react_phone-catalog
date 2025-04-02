import styles from './Breadcrumbs.module.scss';
import homeIcon from '/img/icons/Home.svg';
import rightArrow from '/img/icons/arrows/arrow-right-icon.svg';
import { Link, useLocation } from 'react-router-dom';
import { upperCase } from '../../utils';

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const clearPath = pathname.slice(1);

  const pathSegments = clearPath.split('/');
  const isProductDetailsPage = pathSegments.length === 2;

  const categoryPath = upperCase(pathSegments[0]);
  const productPath = isProductDetailsPage ? upperCase(pathSegments[1]) : '';

  return (
    <div className={styles.breadcrumbs}>
      <Link to="/home" className={styles.breadcrumbs__home}>
        <img src={homeIcon} alt="home icon" />
      </Link>
      <img
        className={styles.breadcrumbs__arrow}
        src={rightArrow}
        alt="right arrow"
      />
      {!isProductDetailsPage ? (
        <p className={styles.breadcrumbs__pathname}>{categoryPath}</p>
      ) : (
        <Link to={`/${pathSegments[0]}`}>
          <p className={styles.breadcrumbs__pathname_active}>{categoryPath}</p>
        </Link>
      )}
      {isProductDetailsPage && (
        <>
          <img
            className={styles.breadcrumbs__arrow}
            src={rightArrow}
            alt="right arrow"
          />
          <span className={styles.breadcrumbs__pathname}>{productPath}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
