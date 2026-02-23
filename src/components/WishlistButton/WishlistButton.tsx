import cn from 'classnames';
import styles from './WishlistButton.module.scss';

interface Props {
  productId: string;
  isLiked?: boolean;
  toggleWishlist: (value: string) => void;
}

export const WishlistButton = ({
  productId,
  isLiked = false,
  toggleWishlist,
}: Props) => {
  return (
    <button
      type="button"
      className={cn(styles.btn, {
        [styles.btnActive]: isLiked,
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
