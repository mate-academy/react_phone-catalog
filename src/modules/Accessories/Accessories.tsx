import { useEffect, useState } from 'react';
import { getAccessoriesFromApi } from '../shared/utils/api';
import { Products } from '../shared/types/Products';
import { ProductList } from '../shared/components/ProductList';

export const Accessories = () => {
  const [allAccessories, setAllAccessories] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const [accessoriesErrorMessage, setAccessoriesErrorMessage] = useState('');

  const loadAccessories = () => {
    setLoader(true);
    setAccessoriesErrorMessage('');

    getAccessoriesFromApi()
      .then(phonesFromApi => {
        setAllAccessories(phonesFromApi);
      })
      .catch(() => {
        setLoader(false);
        setAccessoriesErrorMessage(
          'Wrong upload data from the server, please try again',
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    loadAccessories();
  }, []);

  return (
    <ProductList
      category={allAccessories}
      categoryType="Accessories"
      showLoader={loader}
      errorMessage={accessoriesErrorMessage}
      onReload={loadAccessories}
    />
  );
};
