import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const accessoriesProducts: Product[] = phonesData
  .filter(product => product.category === 'accessories')
  .map(product => ({
    ...product,
    id: String(product.id),
  })) as Product[];

export const AccessoriesPage: React.FC = () => {
  return (
    <>
      <PageSlider products={accessoriesProducts} showFullPrice={false} sliderTitle="Accessories" />
    </>
  );
};

export default AccessoriesPage;
