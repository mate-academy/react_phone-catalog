import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../../shared/types';
import { useEffect, useState } from 'react';

type Props = {
  products: Product[] | [];
};

export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const [numberOfPhones, setNumberOfPhones] = useState(0);
  const [numberOfTablets, setNumberOfTablets] = useState(0);
  const [numberOfAccessories, setNumberOfAccessories] = useState(0);

  useEffect(() => {
    setNumberOfPhones(
      products.filter(product => product.category === 'phones').length,
    );

    setNumberOfTablets(
      products.filter(product => product.category === 'tablets').length,
    );

    setNumberOfAccessories(
      products.filter(product => product.category === 'accessories').length,
    );
  }, [products]);

  return (
    <div className={styles.shopByCategory}>
      <h2 className={styles.title}>Shop by category </h2>
      <div className={styles.categories}>
        <Link to="/phones" className={styles.categoryLink}>
          <div className={`${styles.imgs} ${styles.imgPhones}`}></div>
          <h4 className={styles.categoryName}>Mobile phones</h4>
          <p className={styles.productCount}>
            {`${numberOfPhones} `}
            models
          </p>
        </Link>

        <Link to="/tablets" className={styles.categoryLink}>
          <div className={`${styles.imgs} ${styles.imgTablets}`}></div>
          <h4 className={styles.categoryName}>Tablets</h4>
          <p className={styles.productCount}>
            {`${numberOfTablets} `}
            models
          </p>
        </Link>

        <Link to="/accessories" className={styles.categoryLink}>
          <div className={`${styles.imgs} ${styles.imgAccessories}`}></div>
          <h4 className={styles.categoryName}>Accessories</h4>
          <p className={styles.productCount}>
            {`${numberOfAccessories} `}
            models
          </p>
        </Link>
      </div>
    </div>
  );
};
