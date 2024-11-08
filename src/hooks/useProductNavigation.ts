import { useCallback, useState } from 'react';

type TUseProductNavigation = {
  productsLength: number;
  itemsToShow?: number;
};

export const useProductNavigation = ({
  productsLength,
  itemsToShow = 1,
}: TUseProductNavigation) => {
  const [productIndex, setProductIndex] = useState<number>(0);

  const showNextProduct = useCallback(() => {
    setProductIndex(index =>
      index + itemsToShow < productsLength ? index + itemsToShow : 0,
    );
  }, [productsLength]);

  const showPrevProduct = useCallback(() => {
    setProductIndex(index =>
      index - itemsToShow >= 0
        ? index - itemsToShow
        : productsLength - itemsToShow,
    );
  }, [productsLength]);

  const isPrevDisabled = productIndex === 0;
  const isNextDisabled = productIndex + itemsToShow >= productsLength;

  return {
    productIndex,
    showNextProduct,
    showPrevProduct,
    isPrevDisabled,
    isNextDisabled,
  };
};
