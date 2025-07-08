import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const phoneProducts: Product[] = phonesData
  .filter(product => product.category === 'phones')
  .map(product => ({
    ...product,
    id: String(product.id),
  }));

export const PhonesPage: React.FC = () => {
  return (
    <>
      <PageSlider products={phoneProducts} showFullPrice={false} sliderTitle="Mobile phones" />
    </>
  );
};

export default PhonesPage;
