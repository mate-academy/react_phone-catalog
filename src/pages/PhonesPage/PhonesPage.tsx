import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/FetchProducts';
import { ProductType } from '../../types/ProductTypes';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';

export const PhonesPage = () => {
  const [productsPhones, setProductsPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProductsPhones = async () => {
    setIsLoading(true);
    try {
      const getPhonesFromServer = (await getAllProducts())
        .filter(product => product.category === ProductType.Phone);

      setProductsPhones(getPhonesFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsPhones();
  }, []);

  return (
    <section className="phones">
      <ProductsPage
        products={productsPhones}
        isError={isError}
        isLoading={isLoading}
        category={ProductType.Phone}
        title="Mobile phones"
      />
    </section>
  );
};
