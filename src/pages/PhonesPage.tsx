import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const phoneProducts: Product[] = phonesData.filter(
  (product): product is Product => product.category === 'phones',
);

export const PhonesPage: React.FC = () => {
  return (
    <>
      <PageSlider products={phoneProducts} showFullPrice={false} sliderTitle="Mobile phones" />
    </>
  );
};
