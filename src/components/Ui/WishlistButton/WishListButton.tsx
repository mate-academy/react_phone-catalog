import classNames from 'classnames/bind';
import styles from './WishlistButton.module.scss';

const cx = classNames.bind(styles);

type WishlistButtonProps = {
  selected: boolean;
  onClick: () => void;
};

export const WishlistButton = ({ selected, onClick }: WishlistButtonProps) => (
  <button
    type="button"
    className={cx('wishlist-button', { 'wishlist-button--selected': selected })}
    aria-pressed={selected}
    aria-label="Add to favourites"
    onClick={onClick}
  >
    <img
      src={
        selected
          ? '/img/icons/Favourites-selected.svg'
          : '/img/icons/Favourites.svg'
      }
      alt="Wishlist icon"
    />
  </button>
);
