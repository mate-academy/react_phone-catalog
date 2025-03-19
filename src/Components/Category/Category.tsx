import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import styles from './Category.module.scss';
import classNames from 'classnames';

export const Category = () => {
  const {
    phones,
    loading: loadingPhones,
    error: errorPhones,
  } = useAppSelector(state => state.phones);
  const {
    accessories,
    loading: loadingAccessories,
    error: errorAccessories,
  } = useAppSelector(state => state.accessories);
  const {
    tablets,
    loading: loadingTablets,
    error: errorTablets,
  } = useAppSelector(state => state.tablets);

  return (
    <div className={styles.container}>
      <NavLink to="/phones" className={styles.nav}>
        <div className={styles.categoryContainer}>
          <div className={classNames(styles.category, styles.categoryPhones)}>
            <img
              src="/react_phone-catalog/img/category-phones.png"
              alt="phones"
              className={styles.phonesImg}
            />
            <img
              src="/react_phone-catalog/img/category-phones.webp"
              alt="phones"
              className={styles.phonesSecondImg}
            />
          </div>
          <h4 className={styles.title}>Mobile phones</h4>
          {loadingPhones && <Loader />}
          {errorPhones ? (
            errorPhones
          ) : (
            <p className={styles.models}>{phones?.length} models</p>
          )}
        </div>
      </NavLink>
      <NavLink to="/tablets" className={styles.nav}>
        <div className={styles.categoryContainer}>
          <div className={classNames(styles.category, styles.categoryTablets)}>
            <img
              src="/react_phone-catalog/img/category-tablets.png"
              alt="tablets"
              className={styles.tabletsImg}
            />
          </div>
          <h4 className={styles.title}>Tablets</h4>
          {loadingTablets && <Loader />}
          {errorTablets ? (
            errorTablets
          ) : (
            <p className={styles.models}>{tablets?.length} models</p>
          )}
        </div>
      </NavLink>
      <NavLink to="/accessories" className={styles.nav}>
        <div className={styles.categoryContainer}>
          <div
            className={classNames(styles.category, styles.categoryAccessories)}
          >
            <img
              src="/react_phone-catalog/img/category-accessories.png"
              alt="accessories"
              className={styles.accessoriesImg}
            />
          </div>
          <h4 className={styles.title}>Accessories</h4>
          {loadingAccessories && <Loader />}
          {errorAccessories ? (
            errorAccessories
          ) : (
            <p className={styles.models}>{accessories?.length} models</p>
          )}
        </div>
      </NavLink>
    </div>
  );
};
