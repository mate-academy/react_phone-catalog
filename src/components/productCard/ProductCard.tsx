import { Product } from '../../types/Product';
import { AccentButton } from '../accentButton';
import { SecondaryButton } from '../secondaryButton';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <>
      <div className={styles.card}>
        <img src={product.image} alt={'card'} className={styles.card__img} />

        <p className={`${styles.card__name} paragraph`}>{product.name}</p>

        <div className={styles.prices}>
          <h3 className={styles.card__price}>${product.fullPrice}</h3>
        </div>

        <div className={styles.card__divider}></div>

        <div className={styles.card__informartion}>
          <div className={styles.card__info}>
            <p className={styles.card__techChar}>Screen</p>
            <h5 className={styles.card__techValue}>{product.screen}</h5>
          </div>

          <div className={styles.card__info}>
            <p className={styles.card__techChar}>Capacity</p>
            <h5 className={styles.card__techValue}>{product.capacity}</h5>
          </div>

          <div className={styles.card__info}>
            <p className={styles.card__techChar}>RAM</p>
            <h5 className={styles.card__techValue}>{product.ram}</h5>
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
