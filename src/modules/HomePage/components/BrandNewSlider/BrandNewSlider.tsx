import { ProductsSlider } from '../ProductsSlider';
import { sortByModelNumber } from '@/utils/sortByModelNumber';

export const BrandNewSlider = () => {
  return (
    <ProductsSlider
      title="Brand new models"
      sortFunction={sortByModelNumber}
      subtitle={''}
      className={''}
    />
  );
};
