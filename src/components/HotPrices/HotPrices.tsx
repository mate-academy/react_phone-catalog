import { useEffect, useState } from 'react';
import { Products } from '../../types/Products';
import ProductSlider from '../ProductSlider/ProductSlider';
import { getProducts } from '../../api/api';

export const HotPrices = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const showDiscount = true;

  useEffect(() => {
    getProducts().then(data => {
      const sortedProductsByDiscount = data.sort((a, b) => {
        const aDiscount = a.fullPrice - a.price;
        const bDiscount = b.fullPrice - b.price;

        return bDiscount - aDiscount;
      });

      setProducts(sortedProductsByDiscount);
    });
  }, []);

  return (
    <ProductSlider
      title="Hot prices"
      products={products}
      showDiscount={showDiscount}
    />
  );
};
