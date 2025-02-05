import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  return (
    <div className={styles.card}>
      <div className={styles.card__image}></div>

      <div className={styles.card__titleContainer}>
        <div className={styles.card__title}>
          Apple iPhone 14 Pro 128GB Space Black (MQ023)
        </div>
      </div>

      <div className={styles.card__price}>$999</div>

      <div className={styles.card__splitter}></div>

      <article className={styles.card__specs}>
        <div className={styles.card__specContainer}>
          <p>Screen</p>

          <p>6.1” OLED</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>Capacity</p>

          <p>128 GB</p>
        </div>

        <div className={styles.card__specContainer}>
          <p>RAM</p>

          <p>6 GB</p>
        </div>
      </article>

      <div className={styles.card__buttons}>
        <button className={styles.card__addToCart}>Add to cart</button>

        <button className={styles.card__addToFavourite}></button>
      </div>
    </div>
  );
};
