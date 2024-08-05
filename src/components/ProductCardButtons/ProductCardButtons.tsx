import styles from './ProductCardButtons.module.scss';
import { useAppContext } from '../../context/AppContext';
import { Product } from '../../types/Product';
import classNames from 'classnames';
import { getFavouriteIcon, getLikeIcon } from '../../utils/getIcons';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  product: Product;
};

export const ProductCardButtons: React.FC<Props> = ({ product }) => {
  const { theme } = useTheme();

  const {
    favourites,
    addToFavourites,
    removeFromFavourites,
    cart,
    addToCart,
    removeFromCart,
  } = useAppContext();

  const inFavourite = favourites.some(fav => fav.id === product.id);
  const inCart = cart.some(cartItem => cartItem.product.id === product.id);

  const handleClickFavourite = () => {
    if (inFavourite) {
      removeFromFavourites(product.itemId);
    } else {
      addToFavourites(product);
    }
  };

  const handleClickCart = () => {
    if (inCart) {
      removeFromCart(product.itemId);
    } else {
      addToCart(product);
    }
  };

  const likeIcon = getLikeIcon(theme);
  const favouriteIcon = getFavouriteIcon(theme);

  return (
    <div className={styles.container}>
      <button
        className={classNames(styles.buttonCart, { [styles.active]: inCart })}
        onClick={handleClickCart}
      >
        <p
          className={classNames(styles.buttonText, {
            [styles.buttonTextAdded]: inCart,
          })}
        >
          {inCart ? 'Added to cart' : 'Add to cart'}
        </p>
      </button>

      <button className={styles.buttonFavourite} onClick={handleClickFavourite}>
        {inFavourite ? (
          <img src={favouriteIcon} alt="favourite" />
        ) : (
          <img src={likeIcon} alt="like" />
        )}
      </button>
    </div>
  );
};
