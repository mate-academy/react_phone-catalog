import { useContext } from 'react';
import styles from './CartTotalPrice.module.scss';
import { CartStateContext } from '../../../../shared/store/CartProvider';

type Props = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CartTotalPrice: React.FC<Props> = ({ setIsModal }) => {
  const cartProducts = useContext(CartStateContext);

  const totalCartPrice = cartProducts.reduce((acc, product) => {
    return acc + product.product.price * product.quantity;
  }, 0);

  const totalCartItems = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);

  return (
    <div className={styles.cart__totalPrice}>
      <ul className={styles.cart__listItems}>
        <li className={styles.cart__listItemPrice}>${totalCartPrice}</li>
        <li className={styles.cart__listItemInfo}>
          Total for {totalCartItems} items
        </li>
      </ul>
      <span className={styles.cart__line}></span>
      <button
        className={styles.cart__checkout}
        onClick={() => setIsModal(true)}
      >
        Checkout
      </button>
    </div>
  );
};
