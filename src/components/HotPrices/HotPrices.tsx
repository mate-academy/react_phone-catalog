import React, { useMemo } from 'react';
import { Product } from '../../types/Products';
import { ProductsSlider } from '../ProductSlider/ProductSlider';
import { ShopCategory } from '../ShopCategory/ShopCategory';

type Props = {
  products: Product[],
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  const getHotPriceProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => (b.fullPrice - b.price) - (a.fullPrice - a.price));
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.price - a.price);
  }, [products]);

  return (
    <main className="product-showcase">
      <ProductsSlider
        products={getHotPriceProducts}
        title="Hot prices"
      />
      <ShopCategory products={products} />
      <ProductsSlider
        products={getBrandNewProducts}
        title="Brand new models"
      />
    </main>
  );
};
