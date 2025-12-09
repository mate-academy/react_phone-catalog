import { Product } from '@/types';
import styles from '../../../../modules/HomePage/components/SliderComponent.module.scss';
import { Link } from 'react-router-dom';
import { useCart } from '@/modules/CartFavContext/CartContext';

type SliderItemProps = {
  item: Product;
  showDiscount: boolean;
};

const SliderItem: React.FC<SliderItemProps> = ({ item, showDiscount }) => {
  const {
    isFavorite,
    isInCart,
    addToFavorites,
    removeFromFavorites,
    addToCart,
  } = useCart();

  if (!item) return null;

  const fav = isFavorite(item.itemId || '');
  const inCart = isInCart(item.id || 0);

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    addToCart(item);
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;

    if (fav) {
      removeFromFavorites(item.itemId || '');
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div className={styles.SliderComponent__item}>
      <Link
        to={`/${item.category}/${item.itemId}`}
        className={styles.SliderComponent__item__imageContainer}
      >
        <img src={item.image} alt={item.name} />
      </Link>
      <div className={styles.SliderComponent__item__infoContainer}>
        <Link
          to={`/${item.category}/${item.itemId}`}
          className={styles.SliderComponent__item__itemName}
        >
          {item.name}
        </Link>
        <div className={styles.SliderComponent__item__priceContainer}>
          <div className={styles.SliderComponent__item__price}>
            ${item.price}
          </div>
          {showDiscount && (
            <span
              className={styles.SliderComponent__item__fullPrice}
              data-text={`$${item.fullPrice}`}
            >
              ${item.fullPrice}
            </span>
          )}
        </div>
        <div className={styles.SliderComponent__item__divider}></div>
        <div className={styles.SliderComponent__item__specContainer}>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Screen
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.screen}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>
              Capacity
            </span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.capacity}{' '}
            </span>
          </div>
          <div>
            <span className={styles.SliderComponent__item__infoName}>RAM</span>
            <span className={styles.SliderComponent__item__infoValue}>
              {item.ram}{' '}
            </span>
          </div>
        </div>
        <div className={styles.SliderComponent__item__buttonContainer}>
          <button
            onClick={handleCartClick}
            className={`${styles.SliderComponent__item__cartButton} ${
              inCart ? styles['SliderComponent__item__cartButton--added'] : ''
            }`}
          >
            {inCart ? 'Added to Cart' : 'Add to Cart'}
          </button>
          <button
            onClick={handleFav}
            className={styles.SliderComponent__item__favoriteButton}
          >
            <img
              src={fav ? 'img/icons/red-heart.svg' : 'img/icons/heart.svg'}
              alt="Add to Favorites"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SliderItem;
