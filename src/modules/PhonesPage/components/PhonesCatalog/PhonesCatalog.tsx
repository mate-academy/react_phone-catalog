import styles from './PhonesCatalog.module.scss';
import { ProductCard } from '../../../shared/components/ProductCard';
import { getProduct } from '../../../shared/utils/fetchClient';
import { useCallback, useEffect, useState } from 'react';
import { Phone } from '../../../shared/utils/types/apiTypes';
import { SortDrowDown } from '../../../shared/components/SortDropDown';
// eslint-disable-next-line max-len
import { ItemsOnPageDropDown } from '../../../shared/components/ItemsOnPageDropDown';
import { Pagination } from '../../../shared/components/Pagination';
import { STATUS, Status } from '../../../shared/utils/types/Status';
import { Loader } from '../Loader/Loader';

export const PhoneCatalog = () => {
  const [phones, setPhones] = useState<Phone[] | undefined>();
  const [status, setStatus] = useState<Status>(STATUS.idle);
  const phonesCounter = phones?.length;

  const loadPhones = useCallback(() => {
    return getProduct('/phones.json')
      .then(data => {
        setPhones(data);
        setStatus(STATUS.resolved);
      })
      .catch(() => 'Couldn`t load products');
  }, []);

  useEffect(() => {
    setStatus(STATUS.pending);
    loadPhones();
  }, [loadPhones]);

  return (
    <>
      <div className={styles.catalog}>
        <div className={styles.catalog__header}>
          <div className={styles['catalog__bread-crumbs']}>
            <img src="public/icons/Home.svg" alt="home icon" />
            <img src="public/icons/ArrowRight.svg" alt="arrow right icon" />
            <p className={styles['catalog__bread-crumbs--text']}>Phones</p>
          </div>
          <h1 className={styles.catalog__title}>Mobile phones</h1>
          <p className={styles.catalog__counter}>{phonesCounter} models</p>
          <div className={styles['catalog__drop-downs']}>
            <SortDrowDown />
            <ItemsOnPageDropDown />
          </div>
        </div>
        {status === STATUS.pending ? (
          <Loader />
        ) : (
          <div className={styles.catalog__list}>
            {phones?.map(phone => {
              return (
                <ProductCard
                  key={phone.id}
                  name={phone.name}
                  images={phone.images[0]}
                  priceDiscount={phone.priceDiscount}
                  priceRegular={phone.priceRegular}
                  screen={phone.screen}
                  capacity={phone.capacity}
                  ram={phone.ram}
                />
              );
            })}
          </div>
        )}
        <Pagination total={phonesCounter} perPage={16} />
      </div>
    </>
  );
};
