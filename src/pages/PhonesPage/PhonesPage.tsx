import { fetchPhones } from '../../api';
import { ProductsPage } from '../../components/ProductsPage';

export const PhonesPage = () => (
  <ProductsPage
    category="Mobile Phones"
    fetchProducts={fetchPhones}
  />
);
