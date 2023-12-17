import { useEffect, useState } from 'react';
import { PageType, Product } from '../helpers/Types';
import { ProductList } from '../components/ProductList';
import { NoItems } from '../components/NoItems';
import { Loader } from '../components/Loader';
import { fetchTypeDevice } from '../helpers/Api';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Product[] | null>(null);

  useEffect(() => {
    const feathPhonesData = async () => {
      const jsonData = await fetchTypeDevice(PageType.Accessories);

      setAccessories(() => jsonData);
    };

    feathPhonesData();
  }, []);

  return (
    <>
      {!accessories && (<Loader />)}
      {accessories && accessories.length > 0 && (
        <ProductList
          products={accessories}
        />
      )}
      {accessories && accessories.length === 0
    && (<NoItems page={PageType.Accessories} />)}
    </>
  );
};
