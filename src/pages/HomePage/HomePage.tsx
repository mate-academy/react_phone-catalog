import React, { useMemo } from 'react';
import { Slider } from '../../components/Slider/Slider';
import './HomePage.scss';
import { ProductsSlider } from '../../components/ProductSLider/ProductSLider';
import { Phone } from '../../types/Phone';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

type Props = {
  products: Phone[];
};

export const HomePage: React.FC<Props> = React.memo(({ products }) => {
  const getHotPriceProducts = useMemo(() => {
    return products
      .filter((product) => product.price)
      .sort((a, b) => b.price - a.price);
  }, [products]);

  const getBrandNewProducts = useMemo(() => {
    return [...products].sort((a, b) => b.year - a.year);
  }, [products]);

  return (
    <>
      <Slider />

      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts}
      />

      <ShopByCategory products={products} />

      <ProductsSlider title="Brand new models" products={getBrandNewProducts} />
    </>
  );
});
