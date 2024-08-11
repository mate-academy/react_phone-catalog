import { ProductCardSkeleton as Skeleton } from './ProductCardSkeleton';
import { ProductCard as ActualProductCard } from './ProductCard';

export const ProductCard = Object.assign(ActualProductCard, {
  Skeleton,
});
