import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const phones: Product[] = phonesData;

export const PhonesPage: React.FC = () => {
  return (
    <>
      <PageSlider products={phones} showFullPrice={false} sliderTitle="Mobile phones" />
    </>
  );
};
