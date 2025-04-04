import { ProductsPages } from '../../components/ProductsPages';
import { useAccessories } from '../../context/AccessoriesContext';

const TabletsPage = () => {
  const { error, accessories, loading } = useAccessories();

  return (
    <ProductsPages products={accessories} error={error} loading={loading} />
  );
};

export default TabletsPage;
