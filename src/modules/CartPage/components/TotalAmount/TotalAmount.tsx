import { FC } from 'react';
import styles from './TotalAmount.module.scss';
import { Product } from '../../../../types/Product';
import { useAppSelector } from '../../../../app/hooks';

type Props = {
  products: Product[];
};

export const TotalAmount: FC<Props> = ({ products }) => {
  const totalAmount = useAppSelector(state =>
    state.cart.reduce((sum, item) => sum + item.price * item.count, 0),
  );

  return (
    <div className={styles.total__amount}>
      <div className={styles.main__desc}>
        <h2 className={styles.price}>{`$${totalAmount}`}</h2>
        <div
          className={styles.desc}
        >{`total for ${products.length} items`}</div>
      </div>
      <div className={styles.line}> </div>
      <button className={styles.btn}>Checkout</button>
    </div>
  );
};
