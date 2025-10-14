import { ProductCardSkeleton } from '@ui/skeletons';

export const SkeletonList = () => {
  const AMOUNT = 8;
  const arr = Array.from({ length: AMOUNT }, (_, i) => i);

  return arr.map(el => <ProductCardSkeleton key={el} />);
};
