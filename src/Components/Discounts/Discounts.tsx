/* eslint-disable @typescript-eslint/indent */
import { useEffect, useState } from 'react';
import { HotPricesProduct } from '../types/HotPricesProducts';
import { getHotPricesProducts } from '../../api/products';
import { DiscountProduct } from '../DiscountProduct/DiscountProduct';

export const Discounts = () => {
  const [hotPricesProducts, setHotPricesProducts] = useState<
    HotPricesProduct[]
  >([]);

  useEffect(() => {
    getHotPricesProducts().then(setHotPricesProducts);
  }, []);

  return (
    <div className="discounts">
      <h2 className="discounts__title">Hot prices</h2>
      {hotPricesProducts.map(hotProduct => (
        <DiscountProduct discountProduct={hotProduct} key={hotProduct.age} />
      ))}
    </div>
  );
};
