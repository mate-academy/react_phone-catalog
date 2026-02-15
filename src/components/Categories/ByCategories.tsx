import { Link } from 'react-router-dom';
import styles from '../Categories/ByCategories.module.scss';

export function ShopByCategories() {
  return (
    <>
      <div className={styles.categoriesName}>
        <h2>Shop by category</h2>
      </div>
      <div className={styles.sectionCatgerory}>
        <div className={styles.categoyBlock}>
          <section className={styles.categoriesSection}>
            <Link to={`/phones`}>
              <img src="/react_phone-catalog/img/PhonesCat.png" alt="mobiles" className={styles.categoryImage} />
            </Link>
            <Link to={`/phones`} className={styles.categoryNameLink}>
              <h4 className={styles.categoryName}>Mobile phones</h4>
            </Link>
            <p className={styles.countCategory}>95 models</p>
          </section>
        </div>
        <div className={styles.categoyBlock}>
          <section className={styles.categoriesSection}>
            <Link to={`/tablets`}>
              <img src="/react_phone-catalog/img/TabletsCat.png" alt="Tablets" className={styles.categoryImage} />
            </Link>
            <Link to={`/tablets`} className={styles.categoryNameLink}>
              <h4 className={styles.categoryName}>Tablets</h4>
            </Link>
            <p className={styles.countCategory}>24 models</p>
          </section>
        </div>
        <div className={styles.categoyBlock}>
          <section className={styles.categoriesSection}>
            <Link to={`/accessories`}>
              <img src="/react_phone-catalog/img/AcsCat.png" alt="Accessories" className={styles.categoryImage} />
            </Link>
            <Link to={`/accessories`} className={styles.categoryNameLink}>
              <h4 className={styles.categoryName}>Accessories</h4>
            </Link>
            <p className={styles.countCategory}>100 models</p>
          </section>
        </div>
      </div>
    </>
  );
}
