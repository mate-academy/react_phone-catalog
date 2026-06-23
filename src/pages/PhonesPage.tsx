import { getPhones } from '../api/products';
import { ProductsPage } from '../components/ProductsPage/ProductsPage';

export const PhonesPage = () => {
  return <ProductsPage title="Phones page" loadProducts={getPhones} />;
};
