import { CartItemSkeleton } from '../CartItem';
import baseStyles from './base.module.scss';

export const CartListSkeleton = () => (
  <ul className={baseStyles.cartList}>
    {Array.from({ length: 3 }).map((_, i) => (
      <li key={i}>
        <CartItemSkeleton />
      </li>
    ))}
  </ul>
);
