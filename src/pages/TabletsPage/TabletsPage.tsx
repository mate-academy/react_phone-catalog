import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { Loader } from '../../components/Loader/Loader';
import { ProductsNav } from '../../components/ProductsNav/ProductsNav';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/Products';
import { Error } from '../../types/ErrorType';

export const TabletsPage: React.FC = () => {
  const [tablets, setTablets] = useState<Product[]>([]);
  const { isLoading, setIsLoading, setIsError } = useContext(Context);

  const getTablets = (products: Product[], type: string) => {
    const tabletsFromApi = products.filter(
      product => product.type === type,
    );

    setTablets(tabletsFromApi);
  };

  useEffect(() => {
    const loadPhones = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();

        getTablets(products, 'tablet');
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

          <ProductsList title="Tablets" products={tablets} />
        </>
      )}
    </div>
  );
};
