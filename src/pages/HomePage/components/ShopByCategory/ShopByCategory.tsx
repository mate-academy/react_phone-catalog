import { Link } from 'react-router-dom';
import { useProducts } from '../../../../shared/context/ProductsContext';

import Phones from '../../../../assets/images/shopCategory/phones.png';
import Tablets from '../../../../assets/images/shopCategory/tablets.png';
import Accessorie from '../../../../assets/images/shopCategory/accessories.png';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory = () => {
  const { phones, tablets, accessories } = useProducts();

  return (
    <div className={styles.shopByCategory}>
      <h2 className={styles.shopByCategory__title}>Shop by Category</h2>
      <div className={styles.shopByCategory__list}>
        <Link to="/phones" className={styles.shopByCategory__item}>
          <div className={`${styles.item__image} ${styles.image__mobiles}`}>
            <img src={Phones} alt="Phones" />
          </div>
          <div className={styles.item__title}>Mobile phones</div>
          <div className={styles.item__countModels}>{phones.length} models</div>
        </Link>

        <Link to="/tablets" className={styles.shopByCategory__item}>
          <div className={`${styles.item__image} ${styles.image__tablets}`}>
            <img src={Tablets} alt="Tablets" />
          </div>
          <div className={styles.item__title}>Tablets</div>
          <div className={styles.item__countModels}>
            {tablets.length} models
          </div>
        </Link>
        <Link to="/accessories" className={styles.shopByCategory__item}>
          <div className={`${styles.item__image} ${styles.image__accessories}`}>
            <img src={Accessorie} alt="Accessories" />
          </div>
          <div className={styles.item__title}>Accessories</div>
          <div className={styles.item__countModels}>
            {accessories.length} models
          </div>
        </Link>
      </div>
    </div>
  );
};
