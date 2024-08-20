import ProductPage from '../ProductPage/ProductPage';
import { getAccessories } from '../../api/getProduct';

const AccessoriesPage = () => (
  <ProductPage
    fetchProducts={getAccessories}
    productType="accessories"
    title="Accessories"
  />
);

export default AccessoriesPage;
