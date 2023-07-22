import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { getAllProducts } from '../../helpers/FetchProducts';
import { ProductType } from '../../types/ProductTypes';
import { ProductsPage } from '../../components/ProductsPage/ProductsPage';

export const AccessorysPage = () => {
  const [productsAccessory, setProductsAccessory] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchProductsAccessory = async () => {
    setIsLoading(true);
    try {
      const getAccessoryFromServer = (await getAllProducts())
        .filter(product => product.category === ProductType.Tablet);

      setProductsAccessory(getAccessoryFromServer);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAccessory();
  }, []);

  return (
    <section className="phones">
      <ProductsPage
        products={productsAccessory}
        isError={isError}
        isLoading={isLoading}
        category={ProductType.Accessory}
        title="Accessorys"
      />
    </section>
  );
};
