import { useFavorites } from '../../../shared/context/FavoritesContext';
import { IconHeart, IconHeartFilled } from '../../../shared/components/Icons';
import type { Product } from '../../../shared/types/Product';
import styles from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  product: Product;
}

export function FavoriteButton({ product }: FavoriteButtonProps): JSX.Element {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(product.id);

  const handleClick = (): void => {
    toggleFavorite(product);
  };

  return (
    <button
      className={styles.button}
      onClick={handleClick}
      aria-label={
        favorite
          ? `Remove ${product.name} from favorites`
          : `Add ${product.name} to favorites`
      }
      aria-pressed={favorite}
    >
      {favorite ? <IconHeartFilled /> : <IconHeart />}
    </button>
  );
}
