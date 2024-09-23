import styles from './ShopByCategory.module.scss';
import { Title } from '../Title';
import { fetchProducts } from '../../utils/fetch';
import { useEffect, useState } from 'react';
import { Products } from '../../utils/types';
import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  const [phones, setPhones] = useState<Products[] | []>([]);
  const [tablets, setTablets] = useState<Products[] | []>([]);
  const [accessories, setAccessories] = useState<Products[] | []>([]);

  useEffect(() => {
    fetchProducts('phones').then(res => setPhones(res));
    fetchProducts('tablets').then(res => setTablets(res));
    fetchProducts('accessories').then(res => setAccessories(res));
  }, []);

  return (
    <div className={styles.shopByCategory}>
      <div className={styles.shopByCategory__title}>
        <Title level={2}> Shop by category</Title>
      </div>
      <div className={styles.shopByCategory__categories}>
        <div className={styles.shopByCategory__category}>
          <Link to="/phones" className={styles.shopByCategory__link}>
            <img
              src="src/img/shopByCategory/phones.png"
              alt="phone category image"
              className={styles.shopByCategory__image}
            />
          </Link>
          <div className={styles['shopByCategory__category-title']}>
            <Title level={4}>Mobile phones</Title>
          </div>
          <p
            className={styles.shopByCategory__quantity}
          >{`${phones.length} models`}</p>
        </div>
        <div className={styles.shopByCategory__category}>
          <Link to="/tablets" className={styles.shopByCategory__link}>
            <img
              src="src/img/shopByCategory/tablets.png"
              alt="phone category image"
              className={styles.shopByCategory__image}
            />
          </Link>
          <div className={styles['shopByCategory__category-title']}>
            <Title level={4}>Tablets</Title>
          </div>
          <p
            className={styles.shopByCategory__quantity}
          >{`${tablets.length} models`}</p>
        </div>
        <div className={styles.shopByCategory__category}>
          <Link to="/accessories" className={styles.shopByCategory__link}>
            <img
              src="src/img/shopByCategory/accessories.png"
              alt="phone category image"
              className={styles.shopByCategory__image}
            />
          </Link>
          <div className={styles['shopByCategory__category-title']}>
            <Title level={4}>Accessories</Title>
          </div>
          <p
            className={styles.shopByCategory__quantity}
          >{`${accessories.length} models`}</p>
        </div>
      </div>
    </div>
  );
};
