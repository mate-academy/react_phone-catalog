/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Product } from '../../types/Product';
import { useFavourites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';

interface Props {
  product: Product;
  onAddToCart?: (p: Product) => void;
  onToggleFavourite?: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({
  product,
  onAddToCart,
  onToggleFavourite,
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart();
  const { addToFavourites, removeFromFavourites, isInFavourites } =
    useFavourites();

  const img =
    (product as any).image ??
    (product.images && product.images.length
      ? product.images[0]
      : 'img/phones/placeholder.png');

  const priceRegular =
    (product as any).fullPrice ?? product.priceRegular ?? product.price ?? 0;
  const priceDiscount =
    (product as any).price !== undefined &&
    (product as any).fullPrice !== undefined
      ? (product as any).price
      : (product.priceDiscount ?? null);

  const inCart = isInCart(product.id);
  const inFav = isInFavourites(product.id);

  const handleAddToCart = () => {
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
      if (onAddToCart) {
        onAddToCart(product);
      }
    }
  };

  const handleToggleFavourite = () => {
    if (inFav) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }

    if (onToggleFavourite) {
      onToggleFavourite(product);
    }
  };

  return (
    <article className={styles.card} data-id={product.id}>
      {/* 1. Image block */}
      <Link
        to={`/product/${product.category}/${(product as any).itemId ?? product.id}`}
        className={styles.media}
      >
        <img src={img} alt={product.name} />
      </Link>

      {/* 2. Title block */}
      <div className={styles.body}>
        <Link
          to={`/product/${product.category}/${(product as any).itemId ?? product.id}`}
          className={styles.title}
        >
          {product.name}
        </Link>

        {/* 3. Price block */}
        <div className={styles.priceBlock}>
          {priceDiscount ? (
            <>
              <div className={styles.priceDiscount}>${priceDiscount}</div>
              <div className={styles.priceRegular}>${priceRegular}</div>
            </>
          ) : (
            <div className={styles.priceSingle}>${priceRegular}</div>
          )}
        </div>

        {/* 4. Divider */}
        <div className={styles.divider} />

        {/* 5. Specs: Screen / Capacity / RAM */}
        <div className={styles.specs}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Screen</span>
            <span className={styles.specValue}>{product.screen ?? '—'}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>Capacity</span>
            <span className={styles.specValue}>{product.capacity ?? '—'}</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>RAM</span>
            <span className={styles.specValue}>{product.ram ?? '—'}</span>
          </div>
        </div>

        {/* 6. Actions: small heart button left, Add to cart button */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddToCart}
            aria-pressed={inCart}
            aria-label={inCart ? 'Remove from cart' : 'Add to cart'}
          >
            {inCart ? 'Added' : 'Add to cart'}
          </button>

          <button
            type="button"
            className={styles.heartButton}
            onClick={handleToggleFavourite}
            aria-pressed={inFav}
            aria-label={inFav ? 'Remove from favourites' : 'Add to favourites'}
          >
            <img
              src={
                inFav
                  ? 'icons/Favourites Filled (Heart Like).svg'
                  : 'icons/Favourites (Heart Like).svg'
              }
              alt={inFav ? 'favourited' : 'favourite'}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
