import { useEffect, useState } from 'react';
import { Product } from '../helpers/Product';
import { ProductList } from '../components/ProductList';
import { fetchTypeDevice } from '../helpers/Api';
import { Loader } from '../components/Loader';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice('phones');

      setPhones(() => jsonData);
    };

    feathPhonesData();
  }, []);

  return (
    <>
      {phones ? (
        <ProductList
          page="phones"
          title="mobile phones"
          products={phones}
        />
      ) : (<Loader />)}
    </>
  );
};
