import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { useFavourites } from '../../context/FavouriteContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../types/Product';

interface Props {
  product: Product;
  variant?: 'full';
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ product, variant, className }) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();

  const isAdded = isInCart(product.id);
  const favorited = isFavourite(product.id);

  const currentPrice = product.priceDiscount || product.price || 0;
  const oldPrice = product.priceRegular || product.fullPrice;

  const productPath = `/${product.category}/${product.itemId}`;

  const handleAddToCart = () => {
    if (isAdded) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFromFavourites(product.id);
    } else {
      addToFavourites(product);
    }
  };

  const cardClass = `${styles.card} ${variant === 'full' ? styles.card_full : ''} ${className || ''}`;

  return (
    <article className={cardClass}>
      <Link to={productPath} className={styles.image_wrapper}>
        <img
          src={product.images?.[0] || (product as any).image || ''}
          alt={product.name}
          className={styles.image}
        />
      </Link>
      <Link to={productPath} className={styles.title_link}>
        <h3 className={styles.title}>{product.name}</h3>
      </Link>

      <div className={styles.price_container}>
        <span className={styles.price}>${currentPrice}</span>

        {oldPrice && <span className={styles.price_old}>${oldPrice}</span>}
      </div>

      <div className={styles.divider} />

      <div className={styles.info}>
        <p className={styles.characteristic}>
          <span>Screen</span> <b>{product.screen}</b>
        </p>
        <p className={styles.characteristic}>
          <span>Capacity</span> <b>{product.capacity}</b>
        </p>
        <p className={styles.characteristic}>
          <span>RAM</span> <b>{product.ram}</b>
        </p>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.add_to_cart} ${isAdded ? styles.selected : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button className={styles.favorite} onClick={handleFavoriteClick}>
          <img
            src={
              favorited ? '/img/FavouritesFilled.png' : '/img/Favourites.png'
            }
            alt="fav"
          />
        </button>
      </div>
    </article>
  );
};
