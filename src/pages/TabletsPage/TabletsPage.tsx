import { ProductsPage } from '../../components/ProductsPage';
import { fetchTablets } from '../../api';

export const TabletsPage = () => {
  return (
    <ProductsPage
      title="Tablets"
      fetchProducts={fetchTablets}
    />
  );
};
