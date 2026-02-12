import { Link } from 'react-router-dom';
import styles from './Category.module.scss';
import { useProducts } from '../../../shared/Utills/ProductContext';

export const Category = () => {
  const { products } = useProducts();

  return (
    <section className={styles.category}>
      <h2 className={styles.title}>Shop by category</h2>

      <div className={styles.links__container}>
        <Link to="/phones" className={styles.link}>
          <div className={styles.pos}>
            <img
              src="img/category-phones.webp"
              alt="phones"
              className={styles.img__phone}
            />
          </div>

          <h4>Mobile Phones</h4>
          <p>{(products.phones?.length ?? 0) - 1} models</p>
        </Link>

        <Link to="/tablets" className={styles.link}>
          <div className={styles.pos}>
            <img
              src="img/category-tablets.png"
              alt="tablets"
              className={styles.img__tablets}
            />
          </div>

          <h4>Tablets</h4>
          <p>{(products.tablets?.length ?? 0) - 1} models</p>
        </Link>

        <Link to="/accessories" className={styles.link}>
          <div className={styles.pos}>
            <img
              src="img/category-accessories.png"
              alt="accesories"
              className={styles.img__accesories}
            />
          </div>

          <h4>Accesories</h4>

          <p>{(products.accessories?.length ?? 0) - 1} models</p>
        </Link>
      </div>
    </section>
  );
};
