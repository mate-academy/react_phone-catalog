import { useEffect, useState } from 'react';
import { PageType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { fetchTypeDevice } from '../helpers/Api';
import { Loader } from '../components/Loader';
import { NoItems } from '../components/NoItems';

export const TabletsPage = () => {
  const [tablets, setTablets] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(PageType.Tablets);

      setTablets(() => jsonData);
    };

    feathPhonesData();
  }, []);

  return (
    <>
      {!tablets && (<Loader />)}
      {tablets && tablets.length > 0 && (
        <ProductList
          products={tablets}
        />
      )}
      {tablets && tablets.length === 0
      && (<NoItems page={PageType.Tablets} />)}
    </>
  );
};
