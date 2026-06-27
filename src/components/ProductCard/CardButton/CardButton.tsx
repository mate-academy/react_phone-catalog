import { asset } from '../../../utils/paths';
import styles from './CardButton.module.scss';

type Props = {
  isFavorite: boolean;
  isInCart: boolean;
  onToggleFavorite: () => void;
  onToggleCart: () => void;
};

export const CardButton: React.FC<Props> = ({
  isFavorite,
  isInCart,
  onToggleFavorite,
  onToggleCart,
}) => {
  return (
    <div className={styles.cardButtons}>
      <button
        className={`${styles.buttonAddToCart} ${
          isInCart ? styles.buttonAdded : ''
        }`}
        onClick={onToggleCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>

      <button
        type="button"
        aria-label="Add to favorites"
        onClick={onToggleFavorite}
        className={`${styles.buttonAddFavorites} ${
          isFavorite ? styles.selected : ''
        }`}
      >
        <span
          className={styles.heart}
          style={{
            backgroundImage: `url(${asset(
              isFavorite ? 'img/icons/heart-filled.svg' : 'img/icons/heart.svg',
            )})`,
          }}
        />
      </button>
    </div>
  );
};
