import styles from './CatalogCard.module.scss';

import type { ProductDetails } from '../../types';

import { Link, useSearchParams } from 'react-router-dom';

import { useFavorites, useCart } from '../../hooks';

type CatalogCardProps = {
  product: ProductDetails;
  showFullPrice?: boolean;
};

export const CatalogCard = ({
  product,
  showFullPrice: forceFullPrice = false,
}: CatalogCardProps) => {
  const [searchParams] = useSearchParams();

  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToCart, removeFromCart, isInCart } = useCart();

  const favorite = isFavorite(product.id);
  const inCart = isInCart(product.id);

  const category = searchParams.get('category');

  const showPrice =
    forceFullPrice ||
    category === 'phones' ||
    category === 'tablets' ||
    category === 'accessories';

  return (
    <div className={styles.catalogCard}>
      <Link to={`/product/${product.id}`} className={styles.catalogCard__image}>
        <img src={product.images[0]} alt={product.name} />
      </Link>

      <Link to={`/product/${product.id}`} className={styles.catalogCard__name}>
        {product.name}
      </Link>

      <div className={styles.catalogCard__price}>
        <p className={styles.catalogCard__currentPrice}>
          ${product.priceDiscount}
        </p>

        {showPrice && (
          <p className={styles.catalogCard__fullPrice}>
            ${product.priceRegular}
          </p>
        )}
      </div>

      <div className={styles.catalogCard__horizontalBar}></div>

      <div className={styles.catalogCard__info}>
        <div className={styles.catalogCard__infoItem}>
          <p>Screen</p>
          <p>{product.screen}</p>
        </div>

        <div className={styles.catalogCard__infoItem}>
          <p>Capacity</p>
          <p>{product.capacity}</p>
        </div>

        <div className={styles.catalogCard__infoItem}>
          <p>RAM</p>
          <p>{product.ram}</p>
        </div>
      </div>

      <div className={styles.catalogCard__buttons}>
        <button
          className={`${styles.catalogCard__addButton} ${
            inCart ? styles['catalogCard__addButton--added'] : ''
          }`}
          onClick={() => {
            if (inCart) {
              removeFromCart(product.id);
            } else {
              addToCart(product.id);
            }
          }}
        >
          {inCart ? 'Added' : 'Add to cart'}
        </button>

        <button onClick={() => toggleFavorite(product.id)}>
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
