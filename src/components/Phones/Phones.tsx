import { client } from 'fetch/fetch';
import ProductsList from 'components/ProductList/ProductList';

const Phones = () => (
  <ProductsList
    text="Phones"
    title="Phones"
    fetchProducts={client.fetchIPhones}
  />
);

export default Phones;
