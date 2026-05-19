import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Product } from '../../types/Product';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addToCart } from '../../store/cartSlice';
import { toggleFavorite } from '../../store/favoritesSlice';
import styles from './ProductCard.module.scss';
import { getImageUrl } from '../../api/getImage';

interface Props {
  product: Product;
  hideOldPrice?: boolean;
}

export const ProductCard = ({ product, hideOldPrice }: Props) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.items);
  const favoritesItems = useAppSelector(state => state.favorites.items);

  const isAddedToCart = cartItems.some(item => item.id === product.id);
  const isFavorite = favoritesItems.some(item => item.id === product.id);

  const productLink = `/${product.category}/${product.itemId || product.id}`;

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      dispatch(addToCart(product));
    }
  };

  const currentImage =
    product.image ||
    product.imageUrl ||
    (product.images ? product.images[0] : '');
  const imageSrc = getImageUrl(currentImage);

  return (
    <div className={styles.card}>
      <Link to={productLink} className={styles.card__image_link}>
        <img src={imageSrc} alt={product.name} className={styles.card__image} />
      </Link>

      <Link to={productLink} className={styles.card__title}>
        {product.name}
      </Link>

      <div className={styles.card__prices}>
        <span className={styles.card__price_current}>
          ${product.price || product.priceDiscount}
        </span>
        {!hideOldPrice && (product.fullPrice || product.priceRegular) && (
          <span className={styles.card__price_full}>
            ${product.fullPrice || product.priceRegular}
          </span>
        )}
      </div>

      <hr className={styles.card__divider} />

      <div className={styles.card__specs}>
        <div className={styles.card__spec}>
          <span className={styles.card__spec_title}>Screen</span>
          <span className={styles.card__spec_value}>{product.screen}</span>
        </div>
        <div className={styles.card__spec}>
          <span className={styles.card__spec_title}>Capacity</span>
          <span className={styles.card__spec_value}>{product.capacity}</span>
        </div>
        <div className={styles.card__spec}>
          <span className={styles.card__spec_title}>RAM</span>
          <span className={styles.card__spec_value}>{product.ram}</span>
        </div>
      </div>

      <div className={styles.card__actions}>
        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(styles.card__button, {
            [styles.card__button_add]: !isAddedToCart,
            [styles.card__button_added]: isAddedToCart,
          })}
        >
          {isAddedToCart ? 'Added' : 'Add to cart'}
        </button>

        <button
          type="button"
          className={cn(styles.card__button, styles.card__button_fav, {
            [styles['card__button_fav--active']]: isFavorite,
          })}
          onClick={() => dispatch(toggleFavorite(product))}
        >
          <img
            src={getImageUrl(
              isFavorite ? 'img/heart-filled.png' : 'img/heart.png',
            )}
            alt="Favorite"
            className={styles.card__fav_icon}
          />
        </button>
      </div>
    </div>
  );
};
