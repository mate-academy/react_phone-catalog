import cn from 'classnames';
import { HeartIcon } from '../Icons/Icons';
import styles from './FavoriteButton.module.scss';

type Props = {
  isFavorite: boolean;
  onToggle: () => void;
};

export const FavoriteButton = ({ isFavorite, onToggle }: Props) => {
  return (
    <button
      type="button"
      className={cn(styles.favoriteButton, {
        [styles.favoriteButtonActive]: isFavorite,
      })}
      onClick={onToggle}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
    >
      <HeartIcon filled={isFavorite} />
    </button>
  );
};
