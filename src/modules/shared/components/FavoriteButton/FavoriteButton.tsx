import cn from 'classnames';
import { Product } from '../../../../types/Product';
import { useFavorites } from '../../context/FavoritesContext';
import { Icon } from '../Icon';
import styles from './FavoriteButton.module.scss';

interface Props {
  product: Product;
  className?: string;
}

export const FavoriteButton = ({ product, className }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isActive = isFavorite(product.id);

  return (
    <button
      type="button"
      className={cn(styles.button, { [styles.active]: isActive }, className)}
      aria-pressed={isActive}
      aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
      onClick={() => toggleFavorite(product)}
    >
      <Icon name={isActive ? 'heart-filled' : 'heart'} />
    </button>
  );
};
