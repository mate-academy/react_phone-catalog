import { getAssetUrl } from '../../shared/asset';
import { useShop } from '../../shared/context/ShopContext';

import type { Product } from '../../shared/types';

import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  navigate: (to: string) => void;
  showDiscount?: boolean;
};

export default function ProductCard({
  product,
  navigate,
  showDiscount = false,
}: Props) {
  const { addToCart, removeFromCart, toggleFavorite, isFavorite, isInCart } =
    useShop();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  const productUrl = showDiscount
    ? `/product/${product.id}?from=hot`
    : `/product/${product.id}`;

  const handleCartClick = () => {
    if (inCart) {
      removeFromCart(product.id);

      return;
    }

    addToCart(product);
  };

  return (
    <article className={styles.card}>
      <a
        className={styles.imageLink}
        href={productUrl}
        onClick={event => {
          event.preventDefault();
          navigate(productUrl);
        }}
      >
        <img
          src={getAssetUrl(product.images[0])}
          alt={product.name}
          className={styles.image}
        />
      </a>

      <a
        className={styles.title}
        href={productUrl}
        onClick={event => {
          event.preventDefault();
          navigate(productUrl);
        }}
      >
        {product.name}
      </a>

      <div className={styles.price}>
        {showDiscount ? (
          <>
            <strong>${product.priceDiscount}</strong>

            {product.priceRegular > product.priceDiscount && (
              <del>${product.priceRegular}</del>
            )}
          </>
        ) : (
          <strong>${product.priceRegular}</strong>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.specs}>
        <div>
          <span>Screen</span>
          <b>{product.screen}</b>
        </div>

        <div>
          <span>Capacity</span>
          <b>{product.capacity}</b>
        </div>

        <div>
          <span>RAM</span>
          <b>{product.ram}</b>
        </div>
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.cartButton} ${inCart ? styles.added : ''}`}
          onClick={handleCartClick}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.favoriteButton} ${
            favorite ? styles.favoriteActive : ''
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          onClick={() => toggleFavorite(product.id)}
        >
          {favorite ? '♥' : '♡'}
        </button>
      </div>
    </article>
  );
}
