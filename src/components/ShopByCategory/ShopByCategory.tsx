import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { Product } from '../../types/Product';
import categoryPhones from '../../assets/image/CategoryPhone.png';
import categoryTablets from '../../assets/image/CategoryTablets.png';
import categoryAccessories from '../../assets/image/CategoryAccessories.png';
interface Props {
  products: Product[];
}
export const ShopByCategory: React.FC<Props> = ({ products }) => {
  const phonesCount = products.filter(p => p.category === 'phones').length;
  const tabletsCount = products.filter(p => p.category === 'tablets').length;
  const accessoriesCount = products.filter(
    p => p.category === 'accessories',
  ).length;

  return (
    <section className={styles.category}>
      <h2 className={styles.category__title}>Shop by category</h2>
      <div className={styles.category__list}>
        <Link to="/phones" className={styles.category__item}>
          <div className={styles.category__imgWrapper}>
            <img
              src={categoryPhones}
              alt="Phones"
              className={styles.category__img}
            />
          </div>
          <p className={styles.category__text}>Mobile phones</p>
          <span className={styles.category__countModels}>
            {phonesCount} models
          </span>
        </Link>
        <Link to="/tablets" className={styles.category__item}>
          <div className={styles.category__imgWrapper}>
            <img
              src={categoryTablets}
              alt="Tablets"
              className={styles.category__img}
            />
          </div>
          <p className={styles.category__text}>Tablets</p>
          <span className={styles.category__countModels}>
            {tabletsCount} models
          </span>
        </Link>
        <Link to="/accessories" className={styles.category__item}>
          <div className={styles.category__imgWrapper}>
            <img
              src={categoryAccessories}
              alt="Accessories"
              className={styles.category__img}
            />
          </div>
          <p className={styles.category__text}>Accessories</p>
          <span className={styles.category__countModels}>
            {accessoriesCount} models
          </span>
        </Link>
      </div>
    </section>
  );
};
