import styles from './productAction.module.scss';
import { useProductActions } from '../../context/ProductActionsContext';

type Props = {
  id: string;
  size?: 'catalog' | 'details';
};

export const ProductActions = ({ id, size = 'catalog' }: Props) => {
  const { cart, liked, toggleCart, toggleLike } = useProductActions();

  const isInCart = cart.includes(id);
  const isLiked = liked.includes(id);

  return (
    <div
      className={`${styles.buttons} ${
        size === 'details' ? styles.details : ''
      }`}
    >
      <button
        className={`${styles.buttons__add} ${
          isInCart ? styles.activeButton : ''
        }`}
        onClick={() => toggleCart(id)}
      >
        {isInCart ? 'Added' : 'Add to cart'}
      </button>
      <button
        className={`${styles.buttons__like} ${
          isLiked ? styles.activeButtonLike : ''
        }`}
        onClick={() => toggleLike(id)}
      >
        <img
          className={styles.lightIcon}
          src={
            isLiked
              ? `${import.meta.env.BASE_URL}/img/icons/FavouritesFilled.svg`
              : `${import.meta.env.BASE_URL}/img/icons/HeartLike.svg`
          }
          alt="icon heart like"
        />

        <img
          className={styles.darkIcon}
          src={
            isLiked
              ? `${import.meta.env.BASE_URL}/img/icons-dark/Favourites-active.svg`
              : `${import.meta.env.BASE_URL}/img/icons-dark/Favourites.svg`
          }
          alt="icon heart like"
        />
      </button>
    </div>
  );
};
