import Categories from '../Categories/Categories';
import styles from './ShopByCategories.module.scss';

export const ShopByCategories = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Shop by category</h2>
      <Categories />
    </div>
  );
};

export default ShopByCategories;
