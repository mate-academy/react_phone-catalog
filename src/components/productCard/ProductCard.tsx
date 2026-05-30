import { Link } from 'react-router-dom';
import { ProductInfo } from '../../types/ProductInfo';
import { AccentButton } from '../accentButton';
import { SecondaryButton } from '../secondaryButton';
import styles from './ProductCard.module.scss';

type Props = {
  product: ProductInfo;
  type?: string | null;
};

export const ProductCard: React.FC<Props> = ({ product, type }) => {
  return (
    <div className={styles.card}>
      <Link
        className={styles.card__img_wrapper}
        to={{
          pathname: `/${product.category}/${product.id}`,
        }}
      >
        <img
          src={`${product.images[0]}`}
          alt={'card'}
          className={styles.card__img}
        />
      </Link>

      <p className={`${styles.card__name} paragraph`}>{product.name}</p>

      {type === 'Hot prices' ? (
        <div className={styles.card__prices}>
          <h3 className={styles.card__price}>${product.priceDiscount}</h3>
          <h3 className={styles.card__price_regular}>
            ${product.priceRegular}
          </h3>
        </div>
      ) : (
        <div className={styles.card__prices}>
          <h3 className={styles.card__price}>${product.priceRegular}</h3>
        </div>
      )}

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
        {product && <AccentButton text="Add to cart" product={product} />}
        <SecondaryButton product={product} />
      </div>
    </div>
  );
};
