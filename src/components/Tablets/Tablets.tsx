import { client } from '../../fetch/fetch';
import ProductsList from '../ProductList/ProductList';

const Tablets = () => (
  <ProductsList
    text="Tablets"
    title="Tablets"
    fetchProducts={client.fetchTablets}
  />
);

export default Tablets;
