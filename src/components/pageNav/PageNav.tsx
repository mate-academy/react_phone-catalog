import classNames from 'classnames';
import styles from './PageNav.module.scss';
import { FiHome } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { NavLink, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const PageNav = () => {
  const productName = useAppSelector(state => state.productDetail.product);
  const { productId } = useParams();
  const location = useLocation();
  const currentLocation = location.pathname.split('/')[1];
  const locationName =
    currentLocation.slice(0, 1).toUpperCase() + currentLocation.slice(1);

  return (
    <div className={styles.page}>
      <NavLink to="/" className={styles.page__link}>
        <FiHome
          className={classNames(styles.page__icon, styles['page__icon--home'])}
        />
      </NavLink>

      <IoIosArrowForward className={styles.page__icon} />
      <NavLink
        to={`/${currentLocation}`}
        className={classNames(styles.page__text, {
          [styles['page__text--disabled']]: !productId,
          [styles['page__text--active']]: productId,
        })}
      >
        {locationName}
      </NavLink>
      {productId && (
        <>
          {' '}
          <IoIosArrowForward className={styles.page__icon} />
          <p className={styles.page__productName}> {productName?.name}</p>{' '}
        </>
      )}
    </div>
  );
};
