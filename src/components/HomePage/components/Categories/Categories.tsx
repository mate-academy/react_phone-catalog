import { Link } from 'react-router-dom';
import styles from './Categories.module.scss';
import { useContext } from 'react';
import { AppContext } from '../../../../context/AppContext';

export const Categories = () => {
  const { phones, tablets, accessories } = useContext(AppContext);

  return (
    <div className={styles.categories}>
      <h2>Shop by category</h2>
      <div className={styles.categories__links}>
        <Link to="/phones" className={styles.categories__phones}>
          <div className={styles.categories__phones__image}>
            <img src="/img/category-phones.webp" alt="phone categorie" />
          </div>
          <h2 className={styles.categories__title}>Mobile phones</h2>
          <h3 className={styles.categories__modelsLeft}>
            {phones.length} models
          </h3>
        </Link>
        <Link to="/tablets" className={styles.categories__tablets}>
          <div className={styles.categories__tablets__image}>
            <img src="/img/category-tablets.png" alt="tablets categorie" />
          </div>
          <h2 className={styles.categories__title}>Tablets</h2>
          <h3 className={styles.categories__modelsLeft}>
            {tablets.length} models
          </h3>
        </Link>
        <Link to="/accessories" className={styles.categories__accessories}>
          <div className={styles.categories__accessories__image}>
            <img
              src="/img/category-accessories.png"
              alt="accessories categorie"
            />
          </div>
          <h2 className={styles.categories__title}>Accessories</h2>
          <h3 className={styles.categories__modelsLeft}>
            {accessories.length} models
          </h3>
        </Link>
      </div>
    </div>
  );
};
