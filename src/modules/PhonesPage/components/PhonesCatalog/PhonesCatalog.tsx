import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Product } from '../../../shared/utils/apiTypes';

export const PhoneCatalog = () => {
  const [phones, setPhones] = useState<Product[] | undefined>();

  const loadPhones = useCallback(() => {
    return getProduct('/phones.json').then(data => setPhones(data));
  }, []);

  useEffect(() => {
    loadPhones();
  }, [loadPhones]);

  const phonesCounter = phones?.length;

  return (
    <>
      <div className={styles.catalog}>
        <div>
          <div className={styles['catalog__bread-crumbs']}>
            <img src="public/icons/Home.svg" alt="home icon" />
            <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
            <p className={styles['catalog__bread-crumbs--text']}>Phones</p>
          </div>
          <h1 className={styles.catalog__header}>Mobile phones</h1>
          <p className={styles.catalog__counter}>{phonesCounter} models</p>
        </div>
        {phones?.map(phone => {
          return (
            <ProductCard
              key={phone.id}
              name={phone.name}
              images={phone.images}
              priceDiscount={phone.priceDiscount}
              priceRegular={phone.priceRegular}
              screen={phone.screen}
              capacity={phone.capacity}
              ram={phone.ram}
            />
          );
        })}
      </div>
    </>
  );
};
