import styles from './FavoriteButton.module.scss';

type Props = {
  onClick: () => void;
  className?: string;
  isInFavorites: boolean;
};

export const FavoriteButton: React.FC<Props> = ({
  onClick,
  className,
  isInFavorites,
}) => {
  return (
    <button className={`${styles.button} ${className || ''}`} onClick={onClick}>
      {isInFavorites ? (
        <img src="icons/favourites-blue.svg" alt="Remove from favorites" />
      ) : (
        <img src="icons/favourites.svg" alt="Add to favorites" />
      )}
    </button>
  );
};
