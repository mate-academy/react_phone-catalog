import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import styles from './ProductCard.module.scss';
import { useAppSelector } from '../../app/hooks';
import { ProductCategory } from '../../types/ProductCategory';
import { AddToCartButton } from '../AddToCartButton';
import { AddToFavouritesButton } from '../AddToFavouritesButton';

type Props = {
  product: Product;
  isDiscountVisible?: boolean;
  itemHeight: number;
  itemWidth: number;
};

export const ProductCard: React.FC<Props> = ({
  product,
  isDiscountVisible,
}) => {
  const type = product.category as ProductCategory;
  const { items } = useAppSelector(state => state[type]);
  const productDescription = items.find(item => item.id === product.itemId);

  return (
    <div className={styles.product_card}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img
          src={product.image}
          alt={`Image of ${product.name}`}
          className={styles.product_card__image}
          loading="lazy"
        />
      </Link>

      <Link to={`/${product.category}/${product.itemId}`}>
        <p className={styles.product_card__title}>{product.name}</p>
      </Link>

      <div className={styles.product_card__price_box}>
        <p className={styles.product_card__price}>${product.price}</p>
        {isDiscountVisible && (
          <p className={styles.product_card__full_price}>
            ${product.fullPrice}
          </p>
        )}
      </div>

      <div className={styles.product_card__divider} />

      <div className={styles.product_card__specs}>
        <div className={styles.product_card__spec}>
          <p className={styles.product_card__spec__key}>Screen</p>
          <p className={styles.product_card__spec__value}>{product.screen}</p>
        </div>

        <div className={styles.product_card__spec}>
          <p className={styles.product_card__spec__key}>Capacity</p>
          <p className={styles.product_card__spec__value}>{product.capacity}</p>
        </div>

        <div className={styles.product_card__spec}>
          <p className={styles.product_card__spec__key}>RAM</p>
          <p className={styles.product_card__spec__value}>{product.ram}</p>
        </div>
      </div>

      <div className={styles.product_card__buttons}>
        {productDescription ? (
          <AddToCartButton product={productDescription} />
        ) : (
          <button
            type="button"
            className={styles.not_add_to_cart_button}
            disabled
          >
            {'Cannot add'}
          </button>
        )}

        <AddToFavouritesButton product={product} />
      </div>
    </div>
  );
};
