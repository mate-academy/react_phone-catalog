import { useCart } from '../../../../contexts/CartContext';
import { Product } from '../../../../types/Product';
import styles from './ProductCard.module.scss';
import favIcon from '/icons/favorite-icon.png';

type Props = {
  product: Product;
  showDiscount?: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  showDiscount = false,
}) => {
  const hasDiscount = product.fullPrice > product.price;
  const { cart, addToCart, removeFromCart } = useCart();
  const inCart = cart.some(item => item.id === product.id);

  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <div className={styles.card_image}>
          <img src={product.image} alt={product.name} />
        </div>
        <h3 className={styles.card__title}>{product.name}</h3>
        <div className={styles.card__prices}>
          <span className={styles.card__price}>${product.price}</span>

          {showDiscount && hasDiscount && (
            <span className={styles.card__fullPrice}>${product.fullPrice}</span>
          )}
        </div>
        <div className={styles.divide_line}></div>
        <div className={styles.card__specs}>
          <dl>
            <dt>Screen:</dt>
            <dd>{product.screen}</dd>

            <dt>Capacity:</dt>
            <dd>{product.capacity}</dd>

            <dt>RAM:</dt>
            <dd>{product.ram}</dd>
          </dl>
        </div>
        <div className={styles.card__actions}>
          <button
            type="button"
            className={`${styles.card__addBtn} ${inCart ? styles.card__addBtn__disabled : ''}`}
            onClick={() => {
              if (inCart) {
                removeFromCart(product.id);
              } else {
                addToCart(product);
              }
            }}
          >
            {inCart ? 'Added to cart' : 'Add to cart'}
          </button>

          <button type="button" className={styles.card__favBtn}>
            <img src={favIcon} alt="Add to favorites" />
          </button>
        </div>
      </div>
    </div>
  );
};
