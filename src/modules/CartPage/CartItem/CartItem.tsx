import styles from './CartItem.module.scss';
import { CartProduct } from '../../../types/Products';
import { useContext } from 'react';
import { DispatchContext } from '../../hooks/SelectionState';
import { Link } from 'react-router-dom';
import Minus from '../../../images/icons/Minus.png';
import Plus from '../../../images/icons/Plus.png';
import Close from '../../../images/icons/Close.png';
import classNames from 'classnames';

interface Props {
  product: CartProduct;
}

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useContext(DispatchContext);
  const { quantity } = product;
  const { name, image, price, itemId, category } = product.product;

  const handleRemoveItem = () => {
    dispatch({ type: 'removeCart', payload: itemId });
  };

  const increaseQuantity = () => {
    dispatch({ type: 'addQuantityToCart', payload: itemId });
  };

  const decreaseQuantity = () => {
    dispatch({ type: 'reduceTheQuantityInTheCart', payload: itemId });
  };

  const path = `${category}/${itemId}`;

  return (
    <div className={styles['cart-item']}>
      <div className={styles['cart-item__container']}>
        <button
          className={styles['cart-item__button-delete']}
          onClick={handleRemoveItem}
        >
          <img src={Close} className={styles['cart-item__close']} />
        </button>
        <img className={styles['cart-item__image']} src={image} alt={name} />
        <Link to={path} className={styles['cart-item__limk']}>
          {name}
        </Link>
      </div>

      <div className={styles['cart-item__container--info']}>
        <div className={styles['cart-item__count']}>
          <button
            className={classNames(
              styles['cart-item__button'],
              styles['cart-item__button--minus'],
            )}
            onClick={decreaseQuantity}
            disabled={quantity === 1}
          >
            <img src={Minus} className={styles['cart-item__image--count']} />
          </button>
          <p className={styles['cart-item__quantity']}>{quantity}</p>
          <button
            className={classNames(
              styles['cart-item__button'],
              styles['cart-item__button--plus'],
            )}
            onClick={increaseQuantity}
          >
            <img src={Plus} className={styles['cart-item__image--count']} />
          </button>
        </div>
        <p className={styles['cart-item__price']}>${price * quantity}</p>
      </div>
    </div>
  );
};
