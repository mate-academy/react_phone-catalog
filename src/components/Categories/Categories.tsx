import {
  getAccessories,
  getPhones,
  getTablets,
} from '../../modules/shared/services/productService';
import styles from './Categories.module.scss';

export const Categories: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2>Shop by categoty</h2>

      <div className={styles.wrapper}>
        <article className={`${styles.article}`}>
          <div className={`${styles.banner} ${styles.bannerPhones}`}>
            {/* <img
              className={`${styles.img} ${styles.imgPhones}`}
              src="/img/category-phones.webp"
              alt="Phones category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Mobile phones</h4>
            <span className="bodyText">{getPhones().length} models</span>
          </div>
        </article>

        <article className={`${styles.article}`}>
          <div className={`${styles.banner} ${styles.bannerTablets}`}>
            {/* <img
              className={`${styles.img} ${styles.imgTablets}`}
              src="/img/category-tablets.png"
              alt="Tablets category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Tablets</h4>
            <span className="bodyText">{getTablets().length} models</span>
          </div>
        </article>

        <article className={`${styles.article}`}>
          <div className={`${styles.banner} ${styles.bannerAccessories}`}>
            {/* <img
              className={`${styles.img} ${styles.imgAccessories}`}
              src="/img/category-accessories.png"
              alt="Accessories category"
            /> */}
          </div>

          <div className={styles.details}>
            <h4 className={styles.title}>Accessories</h4>
            <span className="bodyText">{getAccessories().length} models</span>
          </div>
        </article>
      </div>
    </section>
  );
};
