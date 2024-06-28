import { CartCard as ActualCartCard } from './CartCard';
import { CartCardSkeleton as Skeleton } from './CartCardSkeleton';

export const CartCard = Object.assign(ActualCartCard, {
  Skeleton,
});
