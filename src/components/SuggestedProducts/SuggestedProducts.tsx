import React, { useMemo } from 'react';
import type { Product } from '../../types/product';
import { ProductSlider } from '../ProductSlider';

interface Props {
  products?: Product[] | null;
  currentId?: string | number | null;
  maxItems?: number;
  className?: string;
}

function shuffle<T>(arr: T[]) {
  const items = [...arr];

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

export const getSuggestedProducts = (
  products: Product[],
  currentId: string | number | null,
  maxItems: number,
) => {
  const pool = products.filter(
    product => (product.itemId ?? String(product.id)) !== String(currentId),
  );

  return shuffle(pool).slice(0, Math.max(0, maxItems));
};

export const SuggestedProducts: React.FC<Props> = ({
  products,
  currentId = null,
  maxItems = 12,
  className,
}) => {
  const items = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    return getSuggestedProducts(products, currentId, maxItems);
  }, [products, currentId, maxItems]);

  return (
    <ProductSlider
      className={className}
      title="You may also like"
      products={items}
      emptyMessage="No suggestions for now"
    />
  );
};

export default SuggestedProducts;
