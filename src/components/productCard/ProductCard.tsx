import { AccentButton } from '../accentButton';
import { SecondaryButton } from '../secondaryButton';
import styles from './ProductCard.module.scss';

export const ProductCard = () => {
  return (
    <>
      <div className={styles.card}>
        <img
          src="img/phones/apple-iphone-13-pro-max/graphite/00.webp"
          alt={'card'}
          className={styles.card__img}
        />

        <p className={`${styles.card__name} paragraph`}>
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </p>

        <div className={styles.prices}>
          <h3 className={styles.card__price}>$999</h3>
        </div>

        <div className={styles.card__divider}></div>

        <div className={styles.card__informartion}>
          <div className={styles.card__info}>
            <p className={styles.card__techChar}>Screen</p>
            <h5 className={styles.card__techValue}>6.1” OLED</h5>
          </div>

          <div className={styles.card__info}>
            <p className={styles.card__techChar}>Capacity</p>
            <h5 className={styles.card__techValue}>128 GB</h5>
          </div>

          <div className={styles.card__info}>
            <p className={styles.card__techChar}>RAM</p>
            <h5 className={styles.card__techValue}>6 GB</h5>
          </div>
        </div>

        <div className={styles.card__buttons}>
          <AccentButton text="Add to cart" />
          <SecondaryButton />
        </div>
      </div>
    </>
  );
};
