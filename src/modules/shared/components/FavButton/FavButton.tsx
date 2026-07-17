import styles from './FavButton.module.scss';
import FavoriteIcon from '../../../../assets/icons/Favorites.svg';
export type FavButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const FavButton = ({ onClick, disabled = false }: FavButtonProps) => {
  return (
    <button
      className={styles.favButton}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Add to favourites"
    >
      <img src={FavoriteIcon} alt="Favorite" className={styles.favButtonIcon} />
    </button>
  );
};
