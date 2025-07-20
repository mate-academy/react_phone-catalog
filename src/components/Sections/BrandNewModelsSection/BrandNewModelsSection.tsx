import { type FC } from 'react';
import { useFetchProducts } from '../../../hooks/useFetchProducts';
import { getNewestProducts } from '../../../utils/getNewestProducts';
import { ProductsSlider } from '../../Sliders/ProductsSlider';

export const BrandNewModelsSection: FC = () => {
  const { products, isLoading } = useFetchProducts();
  const newestProducts = getNewestProducts(products);

  return (
    <ProductsSlider
      title={'Brand new models'}
      products={newestProducts}
      discount={false}
      isLoading={isLoading}
    />
  );
};
