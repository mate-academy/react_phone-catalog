import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Product } from '@sTypes/Product';
import { useHistory } from '@hooks/useHistory';
import { ProductsSlider } from '@components/ProductsSlider';
import { useProductsPreload } from '@hooks/useProductsPreload';

function getRandomProducts(products: Product[], namespaceId: string = '') {
  const result: Product[] = [];
  const usedIndices = new Set<number>();

  while (result.length < 20 && result.length < products.length) {
    const randomIndex = Math.floor(Math.random() * products.length);

    if (!usedIndices.has(randomIndex)) {
      if (namespaceId && products[randomIndex].itemId.includes(namespaceId)) {
        continue;
      }

      result.push(products[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }

  return result;
}

type Props = {
  className?: string;
  namespaceId?: string;
};

const NAME = 'suggestedProducts';

export const SuggestedProducts: React.FC<Props> = React.memo(
  function SuggestedProducts({ className, namespaceId }) {
    const fisrtLoad = useRef(true);
    const { products } = useProductsPreload();
    const { getHistoryItem, setHistoryItem } = useHistory();

    const [randomProducts, setRandomProducts] = useState<Product[]>(
      getHistoryItem<Product[]>(NAME) || [],
    );

    const allProducts = useMemo(() => {
      return Object.values(products).flat(Infinity);
    }, [products]);

    useEffect(() => {
      if (!fisrtLoad.current && randomProducts.length) {
        setHistoryItem(NAME, randomProducts);
      }

      fisrtLoad.current = false;
    }, [randomProducts, setHistoryItem]);

    useEffect(() => {
      setRandomProducts(prevRandomProducts => {
        if (prevRandomProducts.length || !allProducts.length) {
          return prevRandomProducts;
        }

        return getRandomProducts(allProducts, namespaceId);
      });
    }, [allProducts, namespaceId]);

    return (
      <ProductsSlider
        className={className}
        title="You may also Like"
        products={randomProducts}
      />
    );
  },
);
