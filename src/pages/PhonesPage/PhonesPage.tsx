import { useEffect, useState } from 'react';
import { Product, ProductType } from '../../types/Product';
import { getAllProducts } from '../../helpers/FetchProducts';
import { ProductPage } from '../ProductPage/ProductPage';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPhones = async () => {
    setLoading(true);

    try {
      const getPhonesFromServer = await getAllProducts();

      const phonesOnly = getPhonesFromServer.filter(
        product => product.category === ProductType.Phone,
      );

      setPhones(phonesOnly);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhones();
  }, []);

  return (
    <section className="phones">
      <ProductPage
        products={phones}
        title="Mobile phones"
        isError={error}
        isLoading={loading}
        category={ProductType.Phone}
      />
    </section>
  );
};
