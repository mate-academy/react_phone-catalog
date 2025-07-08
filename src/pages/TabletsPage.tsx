import { PageSlider } from '../components/Main/PageSlider/PageSlider';
import phonesData from '../api/products.json';
import { Product } from '../types/Product';
const tabletsProducts: Product[] = phonesData
  .filter(product => product.category === 'tablets')
  .map(product => ({
    ...product,
    id: String(product.id),
  })) as Product[];

export const TabletsPage: React.FC = () => {
  return (
    <>
      <PageSlider products={tabletsProducts} showFullPrice={false} sliderTitle="Tablets" />
    </>
  );
};

export default TabletsPage;
