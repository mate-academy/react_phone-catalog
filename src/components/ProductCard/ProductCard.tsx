import styles from './ProductCard.module.scss';
import like from './../../img/icons/like.svg';
import likeFilled from './../../img/icons/Favourites Filled (Heart Like).svg';
import { useCart } from '../../CartContext';
import { Link } from 'react-router-dom';

type ProductCardProps = {
  id: string;
  itemId: string;
  name: string;
  image: string;
  price: number;
  fullPrice?: number;
  screen?: string;
  capacity?: string;
  ram?: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  category?: string;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  itemId,
  name,
  image,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  isFavorite,
  onToggleFavorite,
}) => {
  const { addToCart, items } = useCart();

  const isInCart = items.some(item => item.id === itemId);

  const handleAddToCart = () => {
    if (isInCart) {
      return;
    }

    addToCart({
      id: itemId,
      name,
      price,
      image,
    });
  };

  return (
    <article className={styles.card}>
      <Link to={`/product/${itemId}`} className={styles.imgWrap}>
        <img
          src={import.meta.env.BASE_URL + image}
          alt={name}
          className={styles.cardImg}
          loading="lazy"
        />
      </Link>

      <h3 className={styles.cardName}>
        <Link to={`/product/${itemId}`} className={styles.cardLink}>
          {name}
        </Link>
      </h3>

      <div className={styles.priceRow}>
        {fullPrice && fullPrice !== price ? (
          <>
            <span className={styles.price}>${price}</span>
            <span className={styles.fullPrice}>${fullPrice}</span>
          </>
        ) : (
          <span className={styles.price}>${price}</span>
        )}
      </div>

      <span className={styles.line}></span>

      <div className={styles.infoLine}>
        <p className={styles.label}>Screen</p>
        <p className={styles.value}>{screen ?? '—'}</p>
      </div>

      {capacity && (
        <div className={styles.infoLine}>
          <p className={styles.label}>Capacity</p>
          <p className={styles.value}>{capacity}</p>
        </div>
      )}

      {ram && (
        <div className={styles.infoLine}>
          <p className={styles.label}>RAM</p>
          <p className={styles.value}>{ram}</p>
        </div>
      )}

      <div className={styles.addBlock}>
        <button
          className={`${styles.btn} ${isInCart ? styles.added : ''}`}
          onClick={handleAddToCart}
          type="button"
          disabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>

        <button
          className={`${styles.likeBtn} ${isFavorite ? styles.likeBtnActive : ''}`}
          type="button"
          onClick={onToggleFavorite}
        >
          <img src={isFavorite ? likeFilled : like} alt="like" />
        </button>
      </div>
    </article>
  );
};
