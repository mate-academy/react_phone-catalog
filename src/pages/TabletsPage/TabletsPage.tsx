import { useState, useEffect } from 'react';
import { getAllProducts } from '../../helpers/FetchProducts';
import { Product, ProductType } from '../../types/Product';
import { ProductPage } from '../ProductPage/ProductPage';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTablets = async () => {
    setLoading(true);

    try {
      const getPhonesFromServer = await getAllProducts();

      const tabletsOnly = getPhonesFromServer.filter(
        product => product.category === ProductType.Tablet,
      );

      setTablets(tabletsOnly);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTablets();
  }, []);

  return (
    <section className="phones">
      <ProductPage
        products={tablets}
        title="Tablets"
        isError={error}
        isLoading={loading}
        category={ProductType.Tablet}
      />
    </section>
  );
};
