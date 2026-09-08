import { ProductWithYear } from '../../types/product';
import styles from './CartButtons.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addToCart,
  addToFavourites,
  removeFromCart,
  removeFromFavourites,
} from '../features/cart';
import { fav, favFilled } from '../../icons';

type Props = {
  product: ProductWithYear;
};

export const CartButtons: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { cartItems, favourites } = useAppSelector(state => state.cart);

  const [isInCart, setIsInCart] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsInCart(cartItems.some(item => item.id === product.id));
    setIsFavourite(favourites.some(item => item.id === product.id));
  }, [cartItems, favourites, product.id]);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleAddToFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(product));
    } else {
      dispatch(addToFavourites(product));
    }
  };

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={isInCart ? styles.buttonAdded : styles.buttonAdd}
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? 'Added to cart' : 'Add to cart'}
      </button>
      <button className={styles.buttonFav} onClick={handleAddToFavourites}>
        <img src={isFavourite ? favFilled : fav} alt="heart-icon" />
      </button>
    </div>
  );
};
