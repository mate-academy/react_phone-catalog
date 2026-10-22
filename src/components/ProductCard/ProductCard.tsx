export * from './ProductCard';

import styles from './ProductCard.module.scss';

import type { Product } from '../../types';
import { Link, useSearchParams } from 'react-router-dom';
// import { useCart, useFavorites } from '../../hooks';
import { useFavorites, useCart } from '../../hooks';

type ProductCardProps = {
  product: Product;
  showFullPrice?: boolean;
};

export const ProductCard = ({
  product,
  showFullPrice: forceFullPrice = false,
}: ProductCardProps) => {
  const [searchParams] = useSearchParams();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const favorite = isFavorite(product.itemId);
  const inCart = isInCart(product.itemId);

  const category = searchParams.get('category');

  const showPrice =
    forceFullPrice ||
    category === 'phones' ||
    category === 'tablets' ||
    category === 'accessories';

  // Aplicar 'showFullPrice' na chamada para mostrar o desconto

  return (
    <div className={styles.productCard}>
      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCard__image}
      >
        <img src={product.image} alt={product.name} />
      </Link>

      <Link
        to={`/product/${product.itemId}`}
        className={styles.productCard__name}
      >
        {' '}
        {product.name}{' '}
      </Link>

      <div className={styles.productCard__price}>
        <p className={styles.productCard__currentPrice}>${product.price}</p>

        {showPrice && (
          <p className={styles.productCard__fullPrice}>${product.fullPrice}</p>
        )}
      </div>
      <div className={styles.productCard__horizontalBar}></div>
      <div className={styles.productCard__info}>
        <div className={styles.productCard__infoItem}>
          <p>Screen</p>
          <p>{product.screen}</p>
        </div>

        <div className={styles.productCard__infoItem}>
          <p>Capacity</p>
          <p>{product.capacity}</p>
        </div>

        <div className={styles.productCard__infoItem}>
          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>
      <div className={styles.productCard__buttons}>
        <button
          className={`${styles.productCard__addButton} ${
            inCart ? styles['productCard__addButton--added'] : ''
          }`}
          onClick={() => {
            if (inCart) {
              removeFromCart(product.itemId);
            } else {
              addToCart(product.itemId);
            }
          }}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button onClick={() => toggleFavorite(product.itemId)}>
          <img
            src={
              favorite
                ? './icons/Favourites_HeartLikeFilled.svg'
                : './icons/Favourites_HeartLike.svg'
            }
            alt="Add to favorite"
          />
        </button>
      </div>
    </div>
  );
};
