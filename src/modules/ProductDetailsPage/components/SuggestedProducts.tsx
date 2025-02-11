import React, { useMemo } from 'react';
import { Product } from '@sTypes/Product';
import { ProductsSlider } from '@components/ProductsSlider';
import { useProductsPreload } from '@hooks/useProductsPreload';

function getRandomProducts(products: Product[]) {
  const result: Product[] = [];
  const usedIndices = new Set<number>();

  while (result.length < 20 && result.length < products.length) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (!usedIndices.has(randomIndex)) {
      result.push(products[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

type Props = {
  className?: string;
  productId: string;
};

export const SuggestedProducts: React.FC<Props> = React.memo(
  function SuggestedProducts({ className }) {
    const { products } = useProductsPreload();

    const allProducts = useMemo(() => {
      return Object.values(products).flat(Infinity);
    }, [products]);

    return (
      <ProductsSlider
        className={className}
        title="You may also Like"
        products={getRandomProducts(allProducts)}
      />
    );
  },
);
