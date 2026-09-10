import { Divider } from '@/shared/components/Divider';
import { CartItemSkeleton } from '../CartItem/components/CartItemSkeleton';
import styles from './CartSkeleton.module.scss';
import { Skeleton } from '@/shared/components/Skeleton';
import { toRem } from '@/shared/utils/toRem';

const CART_ITEMS_COUNT = 3;

export const CartSkeleton = () => {
  return (
    <div className={styles.cartSkeleton}>
      <div className={styles.list}>
        {Array.from({ length: CART_ITEMS_COUNT }, (_, index) => (
          <CartItemSkeleton key={index} />
        ))}
      </div>

      <div className={styles.total}>
        <div className={styles.priceDetails}>
          <Skeleton width={toRem(86)} height={toRem(37)} />
          <Skeleton width={toRem(110)} height={toRem(17)} />
        </div>

        <Divider />

        <Skeleton width="100%" height={toRem(46)} />
      </div>
    </div>
  );
};
