import { useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import styles from './shopByCategory.module.scss';
import { ProductQuantity } from '../productQuantity';
import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  const { products } = useContext(ProductContext);

  const amountPhones = [...products].filter(
    product => product.category === 'phones',
  );
  const amountTablets = [...products].filter(
    product => product.category === 'tablets',
  );
  const amountAccessories = [...products].filter(
    product => product.category === 'accessories',
  );

  return (
    <section className={styles.shopByCategory}>
      <div className={styles.container}>
        <h2 className={styles['section-title']}>Shop by category</h2>
        <div className={styles.categories}>
          <Link to="/phones" className={styles.category}>
            <img
              src="./img/category-phones.png"
              alt="category-phones"
              className={styles.categoryImg}
            />
            <h3 className={styles.categoryTitle}>Phones</h3>
            <ProductQuantity quantity={amountPhones.length} />
          </Link>
          <Link to="/tablets" className={styles.category}>
            <img
              src="./img/category-tablets.png"
              alt="category-tablets"
              className={styles.categoryImg}
            />
            <h3 className={styles.categoryTitle}>Tablets</h3>
            <ProductQuantity quantity={amountTablets.length} />
          </Link>
          <Link to="/accessories" className={styles.category}>
            <img
              src="./img/category-accessories.png"
              alt="category-accessories"
              className={styles.categoryImg}
            />
            <h3 className={styles.categoryTitle}>Accessories</h3>
            <ProductQuantity quantity={amountAccessories.length} />
          </Link>
        </div>
      </div>
    </section>
  );
};
