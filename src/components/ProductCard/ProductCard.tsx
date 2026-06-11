import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavouritesContext';
import { useCart } from '../../context/CartContext';
import { Product } from '../../Types/Product';
import styles from './ProductCard.module.scss';

interface Props {
  product?: Product;
  itemId?: string | number;
  category?: string;
  image?: string;
  title?: string;
  name?: string;
  price?: number;
  fullPrice?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
}

export const ProductCard: React.FC<Props> = props => {
  const displayProduct = props.product || {
    id: String(props.itemId || ''),
    itemId: String(props.itemId || ''),
    category: props.category || '',
    image: props.image || '',
    name: props.name || props.title || '',
    price: props.price || 0,
    fullPrice: props.fullPrice || props.price || 0,
    screen: props.screen || '',
    capacity: props.capacity || '',
    ram: props.ram || '',
  };

  const {
    itemId,
    category,
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = displayProduct;

  const hasDiscount = fullPrice && fullPrice > price;

  const { toggleFavorite, isFavorite } = useFavorites();
  const { cartItems, addToCart, removeFromCart } = useCart();

  const stringId = String(itemId);

  const isAddedToFav = isFavorite(stringId);
  const isAddedToCart = cartItems.some(item => item.id === stringId);

  const handleFavouriteClick = () => {
    toggleFavorite(stringId, name);
  };

  const handleAddToCartClick = () => {
    addToCart(stringId, name);
    if (isAddedToCart) {
      removeFromCart(stringId, name);
    }
  };

  return (
    <article className={styles.productCard}>
      <Link to={`/${category}/${itemId}`} className={styles.productCardLink}>
        <div className={styles.productCardImageContainer}>
          <img src={image} alt={name} className={styles.productCardImage} />
        </div>

        <h3 className={styles.productCardTitle}>{name}</h3>
      </Link>

      <div className={styles.productCardPrice}>
        <span className={styles.productCardPriceValue}>${price}</span>
        {hasDiscount && (
          <span className={styles.productCardPriceOld}>${fullPrice}</span>
        )}
      </div>

      <div className={styles.productCardDivider} />

      <div className={styles.productCardSpecs}>
        <div className={styles.productCardSpec}>
          <span className={styles.productCardSpecLabel}>Screen</span>
          <span className={styles.productCardSpecValue}>{screen}</span>
        </div>

        <div className={styles.productCardSpec}>
          <span className={styles.productCardSpecLabel}>Capacity</span>
          <span className={styles.productCardSpecValue}>{capacity}</span>
        </div>

        <div className={styles.productCardSpec}>
          <span className={styles.productCardSpecLabel}>RAM</span>
          <span className={styles.productCardSpecValue}>{ram}</span>
        </div>
      </div>

      <div className={styles.productCardButtons}>
        <button
          type="button"
          className={`${styles.productCardBtnAdd} ${isAddedToCart ? styles.productCardBtnAddActive : ''}`}
          onClick={handleAddToCartClick}
        >
          {isAddedToCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={`${styles.productCardBtnFavorite} ${isAddedToFav ? styles.productCardBtnFavoriteActive : ''}`}
          aria-label="Add to favorites"
          onClick={handleFavouriteClick}
        />
      </div>
    </article>
  );
};
