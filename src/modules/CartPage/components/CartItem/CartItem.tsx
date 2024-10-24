import classNames from 'classnames';
import { CartProduct } from '../../../../types';
import styles from './CartItem.module.scss';
import { useContext } from 'react';
import { DispatchContext } from '../../../../contex/State';
import { Link } from 'react-router-dom';

interface Props {
  product: CartProduct;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const { name, image, quantity, price, itemId } = product;
  const dispatch = useContext(DispatchContext);

  const deleteGood = () => {
    dispatch({ type: 'removeCart', payload: itemId });
  };

  const increaseQuantity = () => {
    dispatch({ type: 'increaseCountInCart', payload: itemId });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'decreaseCountInCart', payload: itemId });
  };

  const path = `/${product.category}/${product.itemId}`;

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__container']}>
        <button
          className={styles['cart-item__del']}
          onClick={deleteGood}
          aria-label="remove good from cart"
        ></button>
        <img className={styles['cart-item__img']} src={image} alt={name} />
        <Link to={path} className={styles['cart-item__link']}>
          {name}
        </Link>
      </div>

      <div className={styles['cart-item__container']}>
        <div className={styles['cart-item__count']}>
          <button
            disabled={quantity <= 1}
            className={classNames(
              styles['cart-item__count-btn'],
              styles['cart-item__count-btn--minus'],
            )}
            onClick={decreaseQuantity}
            aria-label="decrease quantity"
          ></button>
          <p className={styles['cart-item__quantity']}>{quantity}</p>
          <button
            className={classNames(
              styles['cart-item__count-btn'],
              styles['cart-item__count-btn--plus'],
            )}
            onClick={increaseQuantity}
            aria-label="increase quantity"
          ></button>
        </div>
        <p className={styles['cart-item__price']}>${price * quantity}</p>
      </div>
    </div>
  );
};
