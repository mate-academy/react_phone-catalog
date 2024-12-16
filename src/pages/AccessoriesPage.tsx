import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const accessoriesProducts: Product[] = phonesData.filter(
  (product): product is Product => product.category === 'accessories',
);

export const AccessoriesPage: React.FC = () => {
  return (
    <>
      <PageSlider products={accessoriesProducts} showFullPrice={false} sliderTitle="Accessories" />
    </>
  );
};

export default AccessoriesPage;
