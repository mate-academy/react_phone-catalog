import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useCart } from '../../modules/shared/context/CartContext';
import { useFavorites } from '../../modules/shared/context/FavoritesContext';
import { Product } from '../../modules/shared/types/Product';
import { getAssetUrl } from '../../modules/shared/utils/assets';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
};

export const ProductCard = ({ product }: Props) => {
  const { addToCart, isInCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isAddedToCart = isInCart(product.itemId);
  const isAddedToFavorites = isFavorite(product.itemId);
  const handleProductOpen = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <article className={styles.card}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.imageLink}
        onClick={handleProductOpen}
      >
        <img
          className={styles.image}
          src={getAssetUrl(product.image)}
          alt={product.name}
        />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.title}
        onClick={handleProductOpen}
      >
        {product.name}
      </Link>

      <div className={styles.priceRow}>
        <span className={styles.price}>${product.price}</span>

        {product.fullPrice !== product.price && (
          <span className={styles.fullPrice}>${product.fullPrice}</span>
        )}
      </div>

      <dl className={styles.specs}>
        <div>
          <dt>Screen</dt>
          <dd>{product.screen}</dd>
        </div>

        <div>
          <dt>Capacity</dt>
          <dd>{product.capacity}</dd>
        </div>

        <div>
          <dt>RAM</dt>
          <dd>{product.ram}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        <button
          type="button"
          className={classNames(styles.cartButton, {
            [styles.cartButtonAdded]: isAddedToCart,
          })}
          onClick={() => addToCart(product)}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          aria-label="Toggle favorite"
          className={classNames(styles.favoriteButton, {
            [styles.favoriteButtonActive]: isAddedToFavorites,
          })}
          onClick={() => toggleFavorite(product)}
        >
          <i
            className={classNames(
              isAddedToFavorites ? 'fa-solid' : 'fa-regular',
              'fa-heart',
            )}
          />
        </button>
      </div>
    </article>
  );
};
