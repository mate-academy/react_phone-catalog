import { useContext } from 'react';
import styles from './ProductsIntro.module.scss';
import { ProductsContext } from '../../store/ProductsContext';
import icons from '../../assets/icons/icons.svg';

export const ProductsIntro = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className={styles.introContainer}>
      <div className={styles.navigationHome}>
        <button className={styles.homeBtn}>
          <svg>
            <use href={`${icons}#home-icon`}></use>
          </svg>
        </button>
        <span className={styles.arrowLeft}>
          <svg>
            <use href={`${icons}#arrow-right-icon`}></use>
          </svg>
        </span>
        <p className={styles.productName}>Phones</p>
      </div>
      <h1 className={styles.introTitle}>Mobile phones</h1>
      <p className={styles.modelsCount}>{products.length} models</p>
    </div>
  );
};
