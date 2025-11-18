import { UILoadStatus, useProdCard } from '@features/index';
import { organizeCardProps } from './organizeCardProps';
import { ProductCard } from '@entities/prodCard';
import { Product } from '@shared/types';
import { CatalogueData } from '@shared/api';

type Props = {
  data: CatalogueData | Product[] | UILoadStatus;
  firstItemRef?: React.RefObject<HTMLLIElement> | null;
  fallbackAmount: number;
  lazy: boolean;
};

export const ProductCards = ({
  data,
  firstItemRef,
  fallbackAmount,
  lazy = false,
}: Props) => {
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
        lazy={lazy}
      />
    );
  });
};
