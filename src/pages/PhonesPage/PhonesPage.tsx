import { ProductsPage } from '../../components/ProductsPage';
import { fetchPhones } from '../../api';
import './PhonesPage.scss';

export const PhonesPage = () => {
  return (
    <ProductsPage
      title="Mobile Phones"
      fetchProducts={fetchPhones}
    />
  );
};
