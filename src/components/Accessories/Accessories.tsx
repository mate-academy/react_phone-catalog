import { client } from 'fetch/fetch';
import ProductsList from 'components/ProductList/ProductList';

const Accessories = () => (
  <ProductsList
    text="Accessories"
    title="Accessories"
    fetchProducts={client.fetchAccessories}
  />
);

export default Accessories;
