import { useEffect, useState } from 'react';
import { getSuggestedProducts } from '../../../../api/products';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../shared/components/ProductsSlider';

interface Props {
  namespaceId: string;
  className?: string;
}

export const SuggestedProducts = ({ namespaceId, className }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isCurrent = true;

    getSuggestedProducts(namespaceId)
      .then(data => {
        if (isCurrent) {
          setProducts(data);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setProducts([]);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [namespaceId]);

  if (products.length === 0) {
    return null;
  }

  return (
    <ProductsSlider
      title="You may also like"
      products={products}
      className={className}
    />
  );
};
