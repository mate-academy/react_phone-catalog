import { ProductCard } from '@entities/prodCard';
import { useProdCard } from '@features/index';
import { useSliderData } from '@shared/lib';
import { CatalogueProduct } from '@shared/types';

type Props = {
  data: CatalogueProduct[];
};

export const ProductCardList = ({ data }: Props) => {
  const { isIn, stateHandlers } = useProdCard();
  const { DOM } = useSliderData();

  return data.map((el, index) => (
    <ProductCard
      product={el}
      key={index}
      isIn={isIn}
      stateHandlers={stateHandlers}
      ref={index === 0 ? (DOM.item as React.RefObject<HTMLLIElement>) : null}
    />
  ));
};
