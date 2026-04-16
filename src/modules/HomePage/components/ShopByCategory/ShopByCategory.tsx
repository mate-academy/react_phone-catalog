import { Link } from 'react-router-dom';
import styles from './ShopByCategory.module.scss';
import { useShop } from '../../../../store/shop/ShopContext';

export const ShopByCategory = () => {
  const { products } = useShop();
  const phonesCount = products.filter(
    item => item.category === 'phones',
  ).length;
  const tabletsCount = products.filter(
    item => item.category === 'tablets',
  ).length;
  const accessoriesCount = products.filter(
    item => item.category === 'accessories',
  ).length;

  return (
    <section className={styles.shopByCategory}>
      <div className="container">
        <h2 className={styles.title}>Shop by category</h2>
        <div className={styles.categoriesList}>
          <div className={styles.categoryCard}>
            <Link to="/phones" className={styles.shopLink}>
              <picture>
                <source
                  media="(min-width: 1200px)"
                  srcSet="/img/icon/phones-desk.png"
                />
                <source
                  media="(min-width: 640px)"
                  srcSet="/img/icon/phones-tablet.png"
                />
                <img
                  src="/img/icon/phones.png"
                  alt=""
                  className={styles.image}
                />
              </picture>
            </Link>

            <h3 className={styles.name}>Mobile phones</h3>
            <p className={styles.modelsCount}>{`${phonesCount} models`}</p>
          </div>

          <div className={styles.categoryCard}>
            <Link to="/tablets" className={styles.shopLink}>
              <picture>
                <source
                  media="(min-width: 1200px)"
                  srcSet="/img/icon/tablets-desk.png"
                />
                <source
                  media="(min-width: 640px)"
                  srcSet="/img/icon/tablets-tablet.png"
                />
                <img
                  src="/img/icon/tablets.png"
                  alt=""
                  className={styles.image}
                />
              </picture>
            </Link>

            <h3 className={styles.name}>Tablets</h3>
            <p className={styles.modelsCount}>{`${tabletsCount} models`}</p>
          </div>

          <div className={styles.categoryCard}>
            <Link to="/accessories" className={styles.shopLink}>
              <picture>
                <source
                  media="(min-width: 1200px)"
                  srcSet="/img/icon/accessories-desk.png"
                />
                <source
                  media="(min-width: 640px)"
                  srcSet="/img/icon/accessories-tablet.png"
                />
                <img
                  src="/img/icon/accessories.png"
                  alt=""
                  className={styles.image}
                />
              </picture>
            </Link>

            <h3 className={styles.name}>Accessories</h3>
            <p className={styles.modelsCount}>{`${accessoriesCount} models`}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
