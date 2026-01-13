import { FC } from 'react';
import styles from './Summary.module.scss';
import { Button } from '@/modules/shared/components/Button';
import classNames from 'classnames';
import { Skeleton } from '@/modules/shared/components/Skeleton';

interface Props {
  totalPrice: number;
  totalItems: number;
  onCheckout: () => void;
  isLoading?: boolean;
  className?: string;
}

export const Summary: FC<Props> = ({
  totalItems,
  totalPrice,
  className,
  isLoading = false,
  onCheckout,
}) => {
  return (
    <aside className={classNames(styles.wrapper, className)}>
      {isLoading ? (
        <div className={classNames(styles.topBar, styles.loaders)}>
          <Skeleton className={styles.priceSkeleton} />
          <Skeleton className={styles.totalItemsSkeleton} />
        </div>
      ) : (
        <div className={styles.topBar}>
          <h2 className={styles.price}>${totalPrice}</h2>
          <p className={styles.items}>Total for {totalItems} items</p>
        </div>
      )}
      <Button
        variant="primary"
        className={styles.checkoutBtn}
        onClick={onCheckout}
        size="large"
        isDisabled={isLoading}
      >
        Checkout
      </Button>
    </aside>
  );
};
