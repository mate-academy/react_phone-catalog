import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const tabletsProducts: Product[] = phonesData.filter(
  (product): product is Product => product.category === 'tablets',
);

export const TabletsPage: React.FC = () => {
  return (
    <>
      <PageSlider products={tabletsProducts} showFullPrice={false} sliderTitle="Tablets" />
    </>
  );
};

export default TabletsPage;
