import ProductPage from '../ProductPage/ProductPage';
import { getPhones } from '../../api/getProduct';

const PhonesPage = () => (
  <ProductPage
    fetchProducts={getPhones}
    productType="phones"
    title="Mobile phones"
  />
);

export default PhonesPage;
