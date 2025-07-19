import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../../../../components/ProductsSlider';

type Props = {
  currentProductName: string;
};

export const SuggestedProducts: React.FC<Props> = ({ currentProductName }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {});
  }, []);

  const getSuggestedProducts = (
    allProducts: Product[],
    currentName: string,
    count = 8,
  ) => {
    const filtered = allProducts.filter(p => p.name !== currentName);

    return filtered.sort(() => Math.random() - 0.5).slice(0, count);
  };

  const suggested = getSuggestedProducts(products, currentProductName);

  return <ProductsSlider title="You may also like" products={suggested} />;
};
