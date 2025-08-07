import React, { useEffect, useState } from 'react';
import styles from './ShopByCategory.module.scss';
import { useMyContext } from '../../../Context/ProductContexts';
import { Link } from 'react-router-dom';

export const ShopByCategory: React.FC = () => {
  const { products } = useMyContext();
  const [phonesQuantity, setPhonesQuantity] = useState(0);
  const [tabletsQuantity, setTabletsQuantity] = useState(0);
  const [accessoriesQuantity, setAccessoriesQuantity] = useState(0);

  useEffect(() => {
    const phones = products.filter(product => product.category === 'phones');
    const tablets = products.filter(product => product.category === 'tablets');
    const accessories = products.filter(
      product => product.category === 'accessories',
    );

    setAccessoriesQuantity(accessories.length);
    setPhonesQuantity(phones.length);
    setTabletsQuantity(tablets.length);
  }, [products]);

  return (
    <div className={styles.shopByCategory}>
      <h2 className={styles.shop_title}>Shop by category</h2>

      <div className={styles.sections}>
        <Link to={'phones'} className={styles.sections_good}>
          <div className={`${styles.good_product} ${styles.good_iphone}`}>
            <img className={styles.good_image} src="img/image 6.png" alt="" />
          </div>

          <h3 className={styles.good_title}>Mobile phones</h3>

          <span
            className={styles.good_quantity}
          >{`${phonesQuantity} models`}</span>
        </Link>

        <Link to={'tablets'} className={styles.sections_good}>
          <div className={`${styles.good_product} ${styles.good_tablet}`}>
            <img className={styles.good_image} src="img/image 5.png" alt="" />
          </div>

          <h3 className={styles.good_title}>Tablets</h3>

          <span
            className={styles.good_quantity}
          >{`${tabletsQuantity} models`}</span>
        </Link>

        <Link to={'accessories'} className={styles.sections_good}>
          <div className={`${styles.good_product} ${styles.good_accessorie}`}>
            <img className={styles.good_image} src="img/image 7.png" alt="" />
          </div>

          <h3 className={styles.good_title}>Accessories</h3>

          <span
            className={styles.good_quantity}
          >{`${accessoriesQuantity} models`}</span>
        </Link>
      </div>
    </div>
  );
};
