import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
};

const NAME = 'suggestedProducts';

export const SuggestedProducts: React.FC<Props> = React.memo(
  function SuggestedProducts({ className }) {
    const { products } = useProductsPreload();
    const [randomProducts, setRandomProducts] = useState<Product[]>([]);

    const allProducts = useMemo(() => {
      return Object.values(products).flat(Infinity);
    }, [products]);

    useEffect(() => {
      const prevProducts: Product[] | undefined = window.history.state[NAME];

      if (prevProducts !== undefined) {
        const newState = { ...window.history.state };

        delete newState[NAME];
        window.history.replaceState(newState, '');

        setRandomProducts(prevProducts);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      setRandomProducts(prevRandomProducts => {
        if (prevRandomProducts.length || !allProducts.length) {
          return prevRandomProducts;
        }

        return getRandomProducts(allProducts);
      });
    }, [allProducts]);

    const saveProducts = useCallback(() => {
      window.history.replaceState(
        { ...window.history.state, [NAME]: randomProducts },
        '',
      );
    }, [randomProducts]);

    return (
      <ProductsSlider
        className={className}
        title="You may also Like"
        products={randomProducts}
        onClick={saveProducts}
      />
    );
  },
);
