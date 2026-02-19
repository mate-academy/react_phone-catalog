import cn from 'classnames';
import styles from './WishlistButton.module.scss';

interface Props {
  isLiked?: boolean;
}

export const WishlistButton = ({ isLiked = false }: Props) => (
  <button
    type="button"
    className={cn(styles.btn, { [styles.btnActive]: isLiked })}
    aria-label={isLiked ? 'Remove from favourites' : 'Add to favourites'}
  >
    <i className={cn(isLiked ? 'fas' : 'far', 'fa-heart')} />
  </button>
);
