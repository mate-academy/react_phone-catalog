import { useAppContext } from 'components/Contexts/AppDataContext';
import Fav from 'assets/icons/favourites.svg';
import FilledFav from 'assets/icons/added.svg';
import styles from './Buttons.module.scss';
import { Product } from 'types/ProductInfo';

type ButtonSize = 'small' | 'medium' | 'large';
type ButtonAlign = 'left' | 'center' | 'right';

interface ButtonsProps {
  product: Product;
  size?: ButtonSize;
  align?: ButtonAlign;
}

const Buttons = ({
  product,
  size = 'small',
  align = 'center',
}: ButtonsProps) => {
  const {
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    isAdded,
    removeFromCart,
    addToCart,
  } = useAppContext();

  const handleFavClicked = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleCartClicked = () => {
    if (isAdded(product.id)) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
  };

  const isProductAdded = isAdded(product.id);

  return (
    <div
      className={`${styles.buttons} ${styles[`buttons_${size}`]} ${styles[`buttons_${align}`]}`}
    >
      <button
        onClick={handleCartClicked}
        className={`${styles.button} ${styles.button_add} ${
          isProductAdded ? styles.button_disabled : ''
        } ${styles[`button_add_${size}`]}`}
        disabled={isProductAdded}
      >
        {isProductAdded ? 'Added' : 'Add to cart'}
      </button>

      <button
        onClick={handleFavClicked}
        className={`${styles.button} ${styles.button_fav} ${styles[`button_fav_${size}`]}`}
      >
        <img
          className={styles.img}
          src={isFavorite(product.id) ? FilledFav : Fav}
          alt="favourite"
        />
      </button>
    </div>
  );
};

export default Buttons;
