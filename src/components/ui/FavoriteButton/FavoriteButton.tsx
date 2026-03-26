import { Heart } from 'lucide-react'; // Імпортуємо іконку Lucide
import styles from './FavoriteButton.module.scss'; // Імпортуємо SCSS модулі

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
}) => {
  return (
    <button
      className={`${styles.favoriteBtn} ${isFavorite ? styles.selected : ''}`}
      onClick={onClick}
      aria-label={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} // Додаємо accessibility
    >
      {/*
        Коли isFavorite === true, ми застосовуємо клас .selected.
        Цей клас буде керувати наповненням (fill) та кольором (stroke) іконки через CSS.
      */}
      <Heart />
    </button>
  );
};
