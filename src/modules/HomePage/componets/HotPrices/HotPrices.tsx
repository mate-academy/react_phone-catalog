import { useEffect, useState } from 'react';
import { Product } from '../../../../types/Product';
import { ProductsSlider } from '../ProductsSlider/ProductsSlider';

export const HotPrices = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/react_phone-catalog/api/products.json')
      .then(res => res.json())
      .then(setAllProducts);
  }, []);

  const hotPrices = allProducts
    .filter(p => p.price < p.fullPrice)
    .sort((a, b) => b.fullPrice - b.price - (a.fullPrice - a.price));

  return (
    <ProductsSlider
      title={'Hot prices'}
      products={hotPrices}
      showDiscount={true}
    />
  );
};
