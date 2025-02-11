import { ProductCard } from '../ProductCard';
import styles from './ProductSlider.module.scss';

interface ProductSliderProps {
  title: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ title }) => {
  return (
    <section className={`${styles.newProducts} blocksIdentation container`}>
      <div className={styles.newProducts__bar}>
        <h2 className={styles.newProducts__title}>{title}</h2>

        <div className={styles.newProducts__buttonsContainer}>
          <button
            className={`${styles.newProducts__button} ${styles.newProducts__buttonLeft} ${styles.newProducts__buttonDisabled}`}
            // disabled={true}
          ></button>

          <button
            className={`${styles.newProducts__button} ${styles.newProducts__buttonRight}`}
          ></button>
        </div>
      </div>

      <div className={styles.newProducts__list}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};
