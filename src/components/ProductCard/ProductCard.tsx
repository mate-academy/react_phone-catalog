import { useFavorite } from '../../pages/FavoritePage/context/FavoriteContext';
import { BaseProduct } from '../../types/BaseProduct';
import styles from './ProductCard.module.scss';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { HeartIcon } from '../icons/HeartIcon';
import { useCart } from '../../pages/CartPage/context/CartContext';

type Props = {
  product: BaseProduct;
  className?: string;
  showDiscount?: boolean;
};

export const ProductCard = ({
  product,
  className,
  showDiscount = true,
}: Props) => {
  const { addToCart, isInCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();
  const displayPrice = showDiscount ? product.price : product.fullPrice;

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={product.image} alt="iphone" className={styles.image} />
      </Link>

      <Link to={`/${product.category}/${product.itemId}`}>
        <p className={styles.name}>{product.name}</p>
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${displayPrice}</p>
        {showDiscount && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <div className={styles.specs}>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Screen</span>
          <span className={styles.specValue} title={product.screen}>
            {product.screen}
          </span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>Capacity</span>
          <span className={styles.specValue}>{product.capacity}</span>
        </div>
        <div className={styles.specRow}>
          <span className={styles.specLabel}>RAM</span>
          <span className={styles.specValue}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          className={classNames(styles.cartButton, {
            [styles.cartButtonActive]: isInCart(String(product.id)),
          })}
          onClick={() => {
            if (product && !isInCart(String(product.id))) {
              addToCart(product);
            }
          }}
          disabled={isInCart(String(product.id))}
        >
          {isInCart(String(product?.id) ?? '')
            ? 'Added to cart'
            : 'Add to cart'}
        </button>
        <button
          className={classNames(styles.favoriteButton, {
            [styles.favoriteButtonActive]: isFavorite(String(product.id)),
          })}
          onClick={() => {
            if (product) {
              if (isFavorite(String(product.id))) {
                removeFromFavorite(String(product.id));
              } else {
                addToFavorite(product);
              }
            }
          }}
        >
          <HeartIcon isActive={isFavorite(String(product.id))} />
        </button>
      </div>
    </div>
  );
};
