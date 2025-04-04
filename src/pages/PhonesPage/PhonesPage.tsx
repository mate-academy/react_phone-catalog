import { ProductsPages } from '../../components/ProductsPages';
import { usePhones } from '../../context/PhonesContext';

const PhonesPage = () => {
  const { error, phones, loading } = usePhones();

  return (
    <ProductsPages
      products={phones}
      error={error}
      loading={loading}
      title="Mobile phones"
    />
  );
};

export default PhonesPage;
