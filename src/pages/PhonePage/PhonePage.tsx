import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/fetchProducts';
import { ProductType } from '../../types/ProductType';
import { ProductPage } from '../../components/ProductPage';

import './PhonePage.scss';

export const PhonePage = () => {
  const [productsPhone, setProductsPhone] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchPhones = async () => {
    setIsLoading(true);

    try {
      const getPhonesFromServer = (await getAllProducts())
        .filter(currentProduct => (
          currentProduct.category === ProductType.Phone
        ));

      setProductsPhone(getPhonesFromServer);
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
      <div className="container">
        <ProductPage
          title="Mobile phones"
          isError={isError}
          isLoading={isLoading}
          products={productsPhone}
          category={ProductType.Phone}
        />
      </div>
    </section>
  );
};
