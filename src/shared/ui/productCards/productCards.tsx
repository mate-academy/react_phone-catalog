import { useProdCard } from '@features/index';
import { CatalogueData, LoadStatus } from '@shared/api';
import { organizeCardProps } from './organizeCardProps';
import { ProductCard } from '@entities/prodCard';
import { Product } from '@shared/types';

type Props = {
  data: CatalogueData | Product[] | LoadStatus;
  firstItemRef?: React.RefObject<HTMLLIElement> | null;
  fallbackAmount: number;
};

export const ProductCards = ({ data, firstItemRef, fallbackAmount }: Props) => {
  const { isIn, stateHandlers } = useProdCard();

  const array =
    typeof data === 'string'
      ? Array.from({ length: fallbackAmount }, (_, i) => i)
      : Array.isArray(data)
        ? data
        : data.items;

  return array.map((el, index) => {
    const { key, ...props } = organizeCardProps(el, isIn, stateHandlers);

    return (
      <ProductCard
        key={key}
        {...props}
        ref={index === 0 && firstItemRef ? firstItemRef : null}
      />
    );
  });
};
