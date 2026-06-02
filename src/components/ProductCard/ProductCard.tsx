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
};

export const ProductCard = ({ product, className }: Props) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();

  return (
    <div className={`${styles.card} ${className || ''}`}>
      <Link to={`/${product.category}/${product.itemId}`}>
        <img src={product.image} alt="iphone" className={styles.image} />
      </Link>

      <Link to={`/${product.category}/${product.itemId}`}>
        <p className={styles.name}>{product.name}</p>
      </Link>

      <div className={styles.prices}>
        <p className={styles.price}>${product.price}</p>
        {product.price < product.fullPrice && (
          <p className={styles.fullPrice}>${product.fullPrice}</p>
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
            if (product) {
              if (isInCart(String(product.id))) {
                removeFromCart(String(product.id));
              } else {
                addToCart(product);
              }
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
