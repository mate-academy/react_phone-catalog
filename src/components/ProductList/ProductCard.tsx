import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { useFavourites } from '../../context/FavouriteContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../types/Product';
import { getUniqueId } from '../../utils/getItemId';

interface Props {
  product: Product;
  variant?: 'full';
  className?: string;
  hideDiscount?: boolean;
}

export const ProductCard: React.FC<Props> = ({
  product,
  variant,
  className,
  hideDiscount,
}) => {
  const { isInCart, addToCart, removeFromCart } = useCart();
  const { isFavourite, addToFavourites, removeFromFavourites } =
    useFavourites();
  
  const uniqueId = getUniqueId(product);
  const isAdded = isInCart(uniqueId);

  const favorited = isFavourite(product.itemId);

  const currentPrice = product.priceDiscount || product.price || 0;
  const oldPrice = product.priceRegular || product.fullPrice;

  const productPath = `/${product.category}/${product.itemId}`;

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (isAdded) {
      removeFromCart(uniqueId);
    } else {
      addToCart(product);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (favorited) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  };

  const handleColorClick = (color: string) => {
    const newId = getUniqueId({ ...product, color });
    console.log(
      'handleColorClick → newId:',
      newId,
      'productId:',
      product.itemId,
    );
    navigate(`/${product.category}/${newId}`);
  };

  const handleCapacityClick = (capacity: string) => {
    const newId = getUniqueId({ ...product, capacity });
    console.log(
      'handleCapacityClick → newId:',
      newId,
      'productId:',
      product.itemId,
    );
    navigate(`/${product.category}/${newId}`);
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
        <h3 className={`${styles.title} body-text14Bold`}>{product.name}</h3>
      </Link>

      <div className={styles.price_container}>
        <span className={`${styles.price} price-text`}>${currentPrice}</span>

        {!hideDiscount && oldPrice && currentPrice < oldPrice && (
          <span className={`${styles.price_old} price-old-text`}>
            ${oldPrice}
          </span>
        )}
      </div>

      <div className={styles.divider} />

      <div className={styles.info}>
        <p className={`${styles.characteristic} small-text12`}>
          <span>Screen</span> <b>{product.screen}</b>
        </p>
        <p className={`${styles.characteristic} small-text12`}>
          <span>Capacity</span> <b>{product.capacity}</b>
        </p>
        <p className={`${styles.characteristic} small-text12`}>
          <span>RAM</span> <b>{product.ram}</b>
        </p>
      </div>

      <div>
        {product.colorsAvailable?.map(c => (
          <button key={c} onClick={() => handleColorClick(c)}>
            {c}
          </button>
        ))}
      </div>

      <div>
        {product.capacityAvailable?.map(c => (
          <button key={c} onClick={() => handleCapacityClick(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.add_to_cart} button-text ${isAdded ? styles.selected : ''}`}
          onClick={handleAddToCart}
        >
          {isAdded ? 'Added' : 'Add to cart'}
        </button>

        <button className={styles.favorite} onClick={handleFavoriteClick}>
          <img
            src={
              favorited ? './img/FavouritesFilled.png' : './img/Favourites.png'
            }
            alt="fav"
          />
        </button>
      </div>
    </article>
  );
};
