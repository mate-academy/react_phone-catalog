import styles from './Buttons.module.scss';
import { FaHeart } from 'react-icons/fa';
import { FaRegHeart } from 'react-icons/fa';
import { addToCart } from '../../features/CartSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import classNames from 'classnames';
import { Product } from '../../types/products';
import { addToFavourite } from '../../features/FavouriteSlice';
type ButtonsProps = {
  product: Product;
  type: 'small' | 'big';
};
export const Buttons = ({ product, type }: ButtonsProps) => {
  const dispach = useAppDispatch();

  const cartItems = useAppSelector(state => state.cartItem.cartItems);
  const favouriteItems = useAppSelector(
    state => state.favourite.favouriteItems,
  );

  if (!product) {
    return null;
  }

  const isInFavourite = favouriteItems.some(
    item => item.id === product.itemId || item.id === product.id,
  );

  const isInCart = cartItems.some(
    item => item.id === product.itemId || item.id === product.id,
  );

  const handleAddToCart = (p: Product) => dispach(addToCart(p));
  const handleAddToFavourite = (p: Product) => dispach(addToFavourite(p));

  return (
    <div className={styles.buttons}>
      <div
        className={classNames(styles.buttons__addCart, {
          [styles['buttons__addCart--small']]: type === 'small',
          [styles['buttons__addCart--disabled']]: isInCart,
        })}
        onClick={() => handleAddToCart(product)}
      >
        {isInCart ? 'Added to cart' : ' Add to cart'}
      </div>
      <div
        className={classNames(styles.buttons__heart, {
          [styles['buttons__heart--small']]: type === 'small',
        })}
        onClick={() => handleAddToFavourite(product)}
      >
        {isInFavourite ? (
          <FaHeart
            className={classNames(styles.buttons__favourite, {
              [styles['buttons__favourite--small']]: type === 'small',
              [styles['buttons__favourite--active']]: isInFavourite,
            })}
          />
        ) : (
          <FaRegHeart />
        )}
      </div>
    </div>
  );
};
