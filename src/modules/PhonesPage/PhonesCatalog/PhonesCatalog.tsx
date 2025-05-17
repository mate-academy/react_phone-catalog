import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../shared/components/ProductCard';
import { getProduct } from '../../shared/utils/fetchClient';
import { useEffect, useState } from 'react';

export const PhoneCatalog = () => {
  const [phones, setPhones] = useState();

  const loadPhones = getProduct('phones.json');

  useEffect(() => {
    loadPhones.then(data => setPhones(data));
  }, [loadPhones]);

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles['catalog__bread-crumbs']}>
          <img src="public/icons/Home.svg" alt="home icon" />
          <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
          <p className={styles['catalog__bread-crumbs--text']}>{phones}</p>
        </div>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};
