import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../../shared/utils/apiTypes';

export const PhoneCatalog = () => {
  const [phones, setPhones] = useState<Product[] | null>();

  const loadPhones = useCallback(() => {
    return getProduct('/phones.json').then(data => setPhones(data));
  }, []);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles['catalog__bread-crumbs']}>
          <img src="public/icons/Home.svg" alt="home icon" />
          <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
          <p className={styles['catalog__bread-crumbs--text']}>Phones</p>
        </div>
        {phones?.map(phone => {
          return <ProductCard key={phone.id} title={phone.name} />;
        })}
      </div>
    </>
  );
};
