import styles from './CartItem.module.scss';
import { Product } from '../../../../types/products';
import CloseIco from '../../../../components/Icons/CloseIco/CloseIco';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  decreaseQuantity,
  increaseQuantity,
  toggleCartItem,
} from '../../../../features/cartSlice';

type Props = {
  product: Product;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const { itemId, image, category, name } = product;
  const cart = useAppSelector(state => state.cart.cart);
  const quantity = cart.find(el => el.id === itemId)?.quantity || 1;
  const price = quantity * product.price;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(toggleCartItem(itemId));
  };

  const increase = () => {
    dispatch(increaseQuantity(itemId));
  };

  const decrease = () => {
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
          <button disabled={quantity === 1} onClick={decrease}>
            -
          </button>
          <p className={styles.CartItem__conunt}>{quantity}</p>
          <button onClick={increase}>+</button>
        </div>

        <p className={styles.CartItem__price}>{`$${price}`}</p>
      </div>
    </article>
  );
};
