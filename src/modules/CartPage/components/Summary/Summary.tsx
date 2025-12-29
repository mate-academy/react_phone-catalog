import { FC } from 'react';
import styles from './Summary.module.scss';
import { Button } from '@/modules/shared/components/Button';
import classNames from 'classnames';

interface Props {
  totalPrice: number;
  totalItems: number;
  className?: string;
}

export const Summary: FC<Props> = ({ totalItems, totalPrice, className }) => {
  return (
    <aside className={classNames(styles.wrapper, className)}>
      <div className={styles.topBar}>
        <h2 className={styles.price}>${totalPrice}</h2>
        <p className={styles.items}>Total for {totalItems} items</p>
      </div>
      <Button variant="primary" height="48px" width="100%" radius="8px">
        Checkout
      </Button>
    </aside>
  );
};
