import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';

export const ShopByCategory: React.FC = () => {
  return (
    <section className={styles.categoryContainer}>
      <section className={styles.categoryShop}>
        <h2>Shop by category</h2>
      </section>

      <div className={styles.categoryList}>
        <Link to={`/phones/`} className={styles.categoryPhones}>
          <img
            className={styles.categoryImg}
            src="./img/category-phones.webp"
            alt="Mobile phones"
          />
          <h3 className={styles.categoryGadgets}>Mobile phones</h3>
          <p className={styles.categoryModels}>124 Models</p>
        </Link>

        <Link to={`/tablets/`} className={styles.categoryTablets}>
          <img
            className={styles.categoryImg}
            src="./img/category-tablets.webp"
            alt="Tablets"
          />
          <h3 className={styles.categoryGadgets}>Tablets</h3>
          <p className={styles.categoryModels}>24 Models</p>
        </Link>

        <Link to={`/accessories/`} className={styles.categoryAccessories}>
          <img
            className={styles.categoryImg}
            src="./img/category-accessories.webp"
            alt="Accessories"
          />
          <h3 className={styles.categoryGadgets}>Accessories</h3>
          <p className={styles.categoryModels}> 100 Models</p>
        </Link>
      </div>
    </section>
  );
};
