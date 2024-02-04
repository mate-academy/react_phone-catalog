import { useState, useEffect } from 'react';
import { Product, ProductType } from '../../types/Product';
import { getAllProducts } from '../../helpers/FetchProducts';
import { ProductPage } from '../ProductPage/ProductPage';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPhones = async () => {
    setIsLoading(true);

    try {
      const getPhonesFromServer = await getAllProducts();

      const phonesOnly = getPhonesFromServer.filter(
        product => product.category === ProductType.Phone,
      );

      setPhones(phonesOnly);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
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
        isError={isError}
        isLoading={isLoading}
        category={ProductType.Phone}
      />
    </section>
  );
};
