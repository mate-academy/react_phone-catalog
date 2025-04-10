'use client';

import { ProductsSlider } from '../ProductsSlider';
import { Product } from '@/types/Product';

export const HotSlider = () => {
  const sortByBiggestDiscount = (a: Product, b: Product) => {
    const discountA = a.priceRegular - a.priceDiscount;
    const discountB = b.priceRegular - b.priceDiscount;
    return discountB - discountA;
  };

  return (
    <ProductsSlider
      title="Hot prices"
      sortFunction={sortByBiggestDiscount}
      cardProps={{ showDiscount: true }}
    />
  );
};
