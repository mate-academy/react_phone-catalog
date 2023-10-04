import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/FetchProducts';
import { ProductType } from '../../types/ProductTypes';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';

export const TabletsPage = () => {
  const [productsTablets, setProductsTablets] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProductsTablets = async () => {
    setIsLoading(true);
    try {
      const getTabletsFromServer = (await getAllProducts())
        .filter(product => product.category === ProductType.Tablet);

      setProductsTablets(getTabletsFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsTablets();
  }, []);

  return (
    <section className="phones">
      <ProductsPage
        products={productsTablets}
        isError={isError}
        isLoading={isLoading}
        category={ProductType.Tablet}
        title="Tablets"
      />
    </section>
  );
};
