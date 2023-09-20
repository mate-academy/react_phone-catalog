import React, { useMemo } from 'react';
import { Carousel } from '../../components/Carousel/Carousel';
import { ProductsSlider } from '../../components/ProductsSlider/ProductsSlider';
import { Product } from '../../types/Product';
import { ShopByCategory } from '../../components/ShopByCategory/ShopByCategory';

type Props = {
  products: Product[];
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
      <Carousel />

      <ProductsSlider
        title="Hot prices"
        products={getHotPriceProducts}
      />

      <ShopByCategory products={products} />

      <ProductsSlider title="Brand new models" products={getBrandNewProducts} />
    </>
  );
});
