import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import { Loader } from '../../components/Loader/Loader';
import { ProductsNav } from '../../components/ProductsNav/ProductsNav';
import { ProductsList } from '../../components/ProductsList/ProductsList';
import { Product } from '../../types/Product';
import { getProducts } from '../../api/Products';
import { Error } from '../../types/ErrorType';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const { isLoading, setIsLoading, setIsError } = useContext(Context);

  const getPhones = (products: Product[], type: string) => {
    const phonesFromApi = products.filter(
      product => product.type === type,
    );

    setPhones(phonesFromApi);
  };

  useEffect(() => {
    const loadPhones = async () => {
      try {
        setIsLoading(true);
        const products = await getProducts();

        getPhones(products, 'phone');
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

          <ProductsList title="Mobile phones" products={phones} />
        </>
      )}
    </div>
  );
};
