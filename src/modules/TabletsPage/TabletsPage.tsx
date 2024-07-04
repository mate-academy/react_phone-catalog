import ProductPage from '../ProductPage/ProductPage';
import { getTablets } from '../../api/getProduct';

const TabletsPage = () => (
  <ProductPage
    fetchProducts={getTablets}
    productType="tablets"
    title="Tablets"
  />
);

export default TabletsPage;
