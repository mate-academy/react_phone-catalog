import { type FC } from 'react';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import { getHotPricedProducts } from '../../../utils/getHotPricedProducts';
import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const HotPricesSection: FC = () => {
  const { products, isLoading } = useFetchProducts();
  const productsWithDiscount = getHotPricedProducts(products);

  return (
    <ProductsSlider
      title={'Hot prices'}
      discount={true}
      products={productsWithDiscount}
      isLoading={isLoading}
    />
  );
};
