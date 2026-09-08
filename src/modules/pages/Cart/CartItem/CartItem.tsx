import { useContext } from 'react';
import styles from './CartItem.module.scss';
import { CartProduct, DispatchContext, Do } from '../../../../context/context';
import CloseIcon from '../../../shared/icons/CloseIcon';
import MinusIcon from '../../../shared/icons/MinusIcon';
import PlusIcon from '../../../shared/icons/PlusIcon';

type Props = {
  product: CartProduct;
};

export const CartItem: React.FC<Props> = ({ product }) => {
  const dispatch = useContext(DispatchContext);
  const totalPrice = +product.price * product.quantity;

  function handleDelete() {
    dispatch({ type: Do.DELETE_CART, payload: product });
  }

  function increaseQuantity() {
    dispatch({ type: Do.ADD_CART, payload: product });
  }

  function decreaseQuantity() {
    dispatch({ type: Do.DECREASE_Q, payload: product });
  }

  return (
    <>
      <div className={styles.item}>
        <div className={styles.item__close} onClick={() => handleDelete()}>
          <CloseIcon />
        </div>
        <img
          className={styles.item__photo}
          src={product.image}
          alt="ProductImg"
        />
        <div className={styles.item__text}>
          <p>{product.name}</p>
        </div>
        <div className={styles.item__wrapper}>
          <div className={styles.item__counter}>
            <button
              onClick={decreaseQuantity}
              disabled={product.quantity === 1}
            >
              <MinusIcon />
            </button>
            {product.quantity}
            <button onClick={increaseQuantity}>
              <PlusIcon />
            </button>
          </div>
          <h3 style={{ width: '80px' }}>{`$${totalPrice}`}</h3>
        </div>
      </div>
    </>
  );
};

export default CartItem;
