import { FC } from 'react';
import styles from './Summary.module.scss';
import { Button } from '@/modules/shared/components/Button';
import classNames from 'classnames';

interface Props {
  totalPrice: number;
  totalItems: number;
  onCheckout: () => void;
  className?: string;
}

export const Summary: FC<Props> = ({
  totalItems,
  totalPrice,
  className,
  onCheckout,
}) => {
  return (
    <aside className={classNames(styles.wrapper, className)}>
      <div className={styles.topBar}>
        <h2 className={styles.price}>${totalPrice}</h2>
        <p className={styles.items}>Total for {totalItems} items</p>
      </div>
      <Button
        variant="primary"
        className={styles.checkoutBtn}
        onClick={onCheckout}
        size="large"
      >
        Checkout
      </Button>
    </aside>
  );
};
