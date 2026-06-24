import cn from 'classnames';
import styles from './WishlistButton.module.scss';

interface Props {
  productId: string;
  isLiked?: boolean;
  toggleWishlist: (value: string) => void;
  additionalClass?: string;
}

export const WishlistButton = ({
  productId,
  isLiked = false,
  toggleWishlist,
  additionalClass = '',
}: Props) => {
  return (
    <button
      type="button"
      className={cn(styles.btn, {
        [styles.btnActive]: isLiked,
        [styles.large]: additionalClass !== '',
      })}
      aria-label={isLiked ? 'Remove from favourites' : 'Add to favourites'}
      onClick={() => {
        toggleWishlist(productId);
      }}
    >
      <i className={cn(isLiked ? 'fas' : 'far', 'fa-heart')} />
    </button>
  );
};
