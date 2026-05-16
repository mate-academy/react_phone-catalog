import { FC } from 'react';
import styles from './TotalAmount.module.scss';
import { Product } from '../../../../types/Product';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { cartSlice } from '../../../../features/cart/cartSlice';

type Props = {
  products: Product[];
};

export const TotalAmount: FC<Props> = ({ products }) => {
  const dispatch = useAppDispatch();

  const cartProducts = useAppSelector(state => state.cart);

  const count = cartProducts.reduce((accum, curr) => accum + curr.count, 0);

  const totalAmount = useAppSelector(state =>
    state.cart.reduce((sum, item) => sum + item.price * item.count, 0),
  );

  const handleCheckout = () => {
    const isConfirmed = window.confirm(
      'Checkout is not implemented yet. Do you want to clear the Cart?',
    );

    if (isConfirmed) {
      dispatch(cartSlice.actions.clearCart());
    }
  };

  return (
    <div className={styles.total__amount}>
      <div className={styles.main__desc}>
        <h2 className={styles.price}>{`$${totalAmount}`}</h2>
        <div className={styles.desc}>{`total for ${count} items`}</div>
      </div>
      <div className={styles.line}> </div>
      <button onClick={handleCheckout} className={styles.btn}>
        Checkout
      </button>
    </div>
  );
};
