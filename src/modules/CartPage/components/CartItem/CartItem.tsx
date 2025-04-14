import { useState } from 'react';
import styles from './CartItem.module.scss';
import { Product } from '../../../../types/products';
import CloseIco from '../../../../components/Icons/CloseIco/CloseIco';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  toggleCartItem,
} from '../../../../features/cartSlice';
import { storage } from '../../../../app/localStorage';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { itemId, image, category, name } = product;
  const quantity = storage.getCartById(itemId)?.quantity || 1;
  const [count, setCount] = useState(quantity);
  const [price, setPrice] = useState(quantity * product.price);

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(toggleCartItem(itemId));
  };

  const increase = () => {
    setCount(count + 1);
    setPrice(price + product.price);
    dispatch(increaseQuantity(itemId));
  };

  const decrease = () => {
    setCount(count - 1);
    setPrice(price - product.price);
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <article className={styles.CartItem}>
      <div className={styles.CartItem__content}>
        <button className={styles.CartItem__close} onClick={handleDelete}>
          <CloseIco />
        </button>

        <Link to={`../${category}/${itemId}`} className={styles.CartItem__link}>
          <img className={styles.CartItem__img} src={image} alt={itemId} />
          <p className={styles.CartItem__name}>{name}</p>
        </Link>
      </div>

      <div className={styles.CartItem__control}>
        <div className={styles.CartItem__counter}>
          <button disabled={count === 1} onClick={decrease}>
            -
          </button>
          <p className={styles.CartItem__conunt}>{count}</p>
          <button onClick={increase}>+</button>
        </div>

        <p className={styles.CartItem__price}>{`$${price}`}</p>
      </div>
    </article>
  );
};
