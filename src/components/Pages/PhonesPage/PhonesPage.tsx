import { Outlet, useLocation } from 'react-router-dom';
import styles from '../PhonesPage/PhonesPage.module.scss';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../shared/GlobalContext/GlobalContext';
import CustomizedBreadcrumbs from '../../shared/BreadCrumbs/BreadCrumbs';
import { CatalogLayout } from '../../shared/CatalogLayout/CatalogLayout';
import classNames from 'classnames';
import { Loader } from '../../shared/Loader/Loader';

export const PhonesPage = () => {
  const {
    currentCategory,
    setcurrentCategory,
    products,
    isSunSelected,
    isLoading,
  } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const phones = products.filter(product => product.category === 'phones');
  const isDetailPage = location.pathname.split('/').length > 2;

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setcurrentCategory('phones');
  }, [currentCategory]);

  return (
    <>
      <div className={styles.crumbs}>
        <CustomizedBreadcrumbs />
      </div>

      <section className={styles.phones}>
        <div className={styles.details}>
          <Outlet />
        </div>

        {loading && !isLoading && <Loader />}

        {!isLoading && !loading && !isDetailPage ? (
          <div className={styles.phones__container}>
            <h2
              className={classNames(styles.phones__title, {
                [styles.phones__title_dark]: !isSunSelected,
              })}
            >
              Mobile phones
            </h2>
            <span
              className={styles.phones__models}
            >{`${phones.length} models`}</span>

            <CatalogLayout products={phones} />
          </div>
        ) : (
          ''
        )}
      </section>
    </>
  );
};
