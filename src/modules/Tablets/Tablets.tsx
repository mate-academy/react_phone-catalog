import { useEffect, useState } from 'react';
import { getTabletsFromApi } from '../shared/utils/api';
import { Products } from '../shared/types/Products';
import { ProductList } from '../shared/components/ProductList';

export const Tablets = () => {
  const [allTablets, setAllTablets] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const [tabletsErrorMessage, setTabletsErrorMessage] = useState('');

  const loadTablets = () => {
    setLoader(true);
    setTabletsErrorMessage('');

    getTabletsFromApi()
      .then(phonesFromApi => {
        setAllTablets(phonesFromApi);
      })
      .catch(() => {
        setLoader(false);
        setTabletsErrorMessage(
          'Wrong upload data from the server, please try again',
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    loadTablets();
  }, []);

  return (
    <ProductList
      category={allTablets}
      categoryType="Tablets"
      showLoader={loader}
      errorMessage={tabletsErrorMessage}
      onReload={loadTablets}
    />
  );
};
