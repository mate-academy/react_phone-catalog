import styles from './ProductCard.module.scss';
import { ProductParams } from './ProductParams/ProductParams';
const titlePlaceholder = 'Apple iPhone Xs 64GB Silver (iMT9G2FS/A)';

const params = {
  screen: '5.8” OLED',
  capacity: '64 GB',
  ram: '4 GB',
};

export const ProductCard = () => {
  return (
    <article className={styles.card}>
      <img className={styles.card__image} />
      <h1 className={styles.card__title}>{titlePlaceholder}</h1>
      <div>
        <p className={styles.card__price}>
          <span className={styles.card__price__actual}>$799</span>
          <div className={styles.card__price__withoutDiscount}>$899</div>
        </p>
      </div>

      <ProductParams phoneParams={params} />
      <div className={styles.buttonsPlaceholder}>
        <div className={styles.buttonsPlaceholder__primary}>Add to cart</div>
        <div className={styles.buttonsPlaceholder__secondary}>♡</div>
      </div>
    </article>
  );
};
