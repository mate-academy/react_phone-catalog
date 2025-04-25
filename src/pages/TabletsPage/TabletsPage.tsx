import { ProductsPages } from '../../components/ProductsPages';
import { useTablets } from '../../context/TabletsContext';

const TabletsPage = () => {
  const { error, tablets, loading } = useTablets();

  return (
    <ProductsPages
      products={tablets}
      error={error}
      loading={loading}
      title="Tablets"
    />
  );
};

export default TabletsPage;
