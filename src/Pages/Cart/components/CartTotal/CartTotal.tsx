// CartTotal.tsx
import { BtnAdd } from '../../../../components/BtnAdd';
import styles from './CartTotal.module.scss';

interface CartTotalProps {
  totalAmount: number;
  totalCount: number;
}

export const CartTotal = ({ totalAmount, totalCount }: CartTotalProps) => {
  return (
    <article className={styles.wraper}>
      <div className={styles.blockInfo}>
        <p className={styles.price}>${totalAmount}</p>
        <p className={styles.count}>
          Total for <span> {totalCount} </span>items
        </p>
      </div>
      <BtnAdd onClick={() => alert('Proceed to checkout')}>Checkout</BtnAdd>
    </article>
  );
};
