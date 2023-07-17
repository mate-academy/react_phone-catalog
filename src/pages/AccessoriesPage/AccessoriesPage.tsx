import { useContext, useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import { Context } from '../../context/Context';
import { getProducts } from '../../api/Products';
import { Error } from '../../types/ErrorType';
import { Loader } from '../../components/Loader/Loader';
import { ProductsNav } from '../../components/ProductsNav/ProductsNav';
import { ProductsList } from '../../components/ProductsList/ProductsList';

export const AccessoriesPage: React.FC = () => {
  const [accessories, setAccessories] = useState<Product[]>([]);
  const { isLoading, setIsLoading, setIsError } = useContext(Context);

  const getAccessories = (products: Product[], type: string) => {
    const accessoriesFromApi = products.filter(
      product => product.type === type,
    );

    setAccessories(accessoriesFromApi);
  };

  useEffect(() => {
    const loadPhones = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();

        getAccessories(products, 'accessory');
      } catch (error) {
        setIsError(Error.GET_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };

    loadPhones();
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ProductsNav />

          <ProductsList title="Accessories" products={accessories} />
        </>
      )}
    </div>
  );
};
