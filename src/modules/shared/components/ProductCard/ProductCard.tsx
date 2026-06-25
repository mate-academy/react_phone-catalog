import { Link } from 'react-router-dom';
import { Product } from '../../../../types';
import { useCart } from '../../../../context/CartContext';
import { useFavorites } from '../../../../context/FavoritesContext';
import { getImg } from '../../../../utils/getImageUrl';
import styles from './ProductCard.module.scss';

type Props = {
  product: Product;
  showFullPriceOnly?: boolean;
  fullWidth?: boolean;
};

export const ProductCard = ({
  product,
  showFullPriceOnly = false,
  fullWidth = false,
}: Props) => {
  const { addToCart, cartItems } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const isAddedToCart = cartItems.some(item => item.id === product.itemId);
  const isLiked = isFavorite(product.itemId);

  const { itemId, category, name, fullPrice, screen, capacity, ram, image } =
    product;

  const handleAddToCard = () => {
    addToCart(product);
  };

  const handleFavorite = () => {
    toggleFavorite(product);
  };

  return (
    <div className={`${styles.card} ${fullWidth ? styles.cardFullWidth : ''}`}>
      {/* Image */}
      <Link to={`/${category}/${itemId}`} className={styles.imageLink}>
        <img src={getImg(image)} alt={name} className={styles.image} />
      </Link>

      {/* Name */}
      <Link to={`/${category}/${itemId}`} className={styles.name}>
        {name}
      </Link>

      {/* Price */}
      <div className={styles.prices}>
        <span className={styles.price}>
          ${showFullPriceOnly ? product.fullPrice : product.price}
        </span>
        {!showFullPriceOnly && (
          <span className={styles.fullPrice}>${fullPrice}</span>
        )}
      </div>

      {/* Devider */}
      <div className={styles.divider} />

      {/* Specs */}
      <div className={styles.specs}>
        <div className={styles.spec}>
          <span className={styles.specName}>Screen</span>
          <span className={styles.specValue}>{screen}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>Capacity</span>
          <span className={styles.specValue}>{capacity}</span>
        </div>
        <div className={styles.spec}>
          <span className={styles.specName}>RAM</span>
          <span className={styles.specValue}>{ram}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <button
          className={`${styles.addToCart} ${isAddedToCart ? styles.addToCartActive : ''}`}
          onClick={handleAddToCard}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>
        <button
          className={`${styles.favorite} ${isLiked ? styles.favoriteActive : ''}`}
          onClick={handleFavorite}
          aria-label="Add to favorites"
        >
          <img
            src={
              isLiked
                ? getImg('img/icons/fav-heart-like-red.svg')
                : getImg('img/icons/fav-heart-like.svg')
            }
            alt="favorite"
          />
        </button>
      </div>
    </div>
  );
};
