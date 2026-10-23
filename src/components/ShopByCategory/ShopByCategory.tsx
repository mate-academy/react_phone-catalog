import { useEffect, useState } from 'react';
import styles from './ShopByCategory.module.scss';
import { Link } from 'react-router-dom';
import { PhoneDetails, ProductDetails, TabletDetails } from '../../types';
import { getPhones } from '../../api/phones';
import { getTablets } from '../../api/tablets';
import { getAccessories } from '../../api/accessories';

import { CategorySkeleton } from '../Loaders/CategorySkeleton';

type ShopByCategoryProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setHasError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ShopByCategory = ({
  isLoading,
  setIsLoading,
  setHasError,
}: ShopByCategoryProps) => {
  const [phones, setPhones] = useState<PhoneDetails[]>([]);
  const [tablets, setTablets] = useState<TabletDetails[]>([]);
  const [accessories, setAccessories] = useState<ProductDetails[]>([]);

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);

    Promise.all([getPhones(), getTablets(), getAccessories()])
      .then(([apiPhones, apiTablets, apiAccessories]) => {
        setPhones(apiPhones);
        setTablets(apiTablets);
        setAccessories(apiAccessories);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
  }, []);

  return (
    <section className={styles.category}>
      <h2>Shop by category</h2>

      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <div className={styles.category__container}>
          <div className={styles.category__type}>
            <Link
              className={`${styles.category__link} ${styles['category__link--phones']}`}
              to="/phones"
            >
              <img src="./img/category-phones.webp" />
            </Link>

            <div className={styles.category__text}>
              <h4>Mobile Phones</h4>
              <p>{phones.length} Models</p>
            </div>
          </div>
          {/* tablets */}
          <div className={styles.category__type}>
            <Link
              className={`${styles.category__link} ${styles['category__link--tablets']}`}
              to="/tablets"
            >
              <img src="./img/category-tablets.webp" />
            </Link>
            <div className={styles.category__text}>
              <h4>Tablets</h4>
              <p>{tablets.length} Models</p>
            </div>
          </div>
          {/* accessories */}
          <div className={styles.category__type}>
            <Link
              className={`${styles.category__link} ${styles['category__link--accessories']}`}
              to="/accessories"
            >
              <img src="./img/category-accessories.webp" />
            </Link>
            <div className={styles.category__text}>
              <h4>Accessories</h4>
              <p>{accessories.length} Models</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
