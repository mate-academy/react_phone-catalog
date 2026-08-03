import { useEffect, useState } from 'react';
import { getPhonesFromApi } from '../shared/utils/api';
import { Products } from '../shared/types/Products';
import { ProductList } from '../shared/components/ProductList';

export const Phones = () => {
  const [allPhones, setAllPhones] = useState<Products[]>([]);
  const [loader, setLoader] = useState(false);
  const [phonesErrorMessage, setPhonesErrorMessage] = useState('');

  const loadPhoned = () => {
    setLoader(true);
    setPhonesErrorMessage('');

    getPhonesFromApi()
      .then(phonesFromApi => {
        setAllPhones(phonesFromApi);
      })
      .catch(phones => {
        if (phones.length === 0) {
          return;
        }

        setLoader(false);
        setPhonesErrorMessage(
          'Wrong upload data from the server, please try again',
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    loadPhoned();
  }, []);

  return (
    <ProductList
      category={allPhones}
      categoryType="Phones"
      showLoader={loader}
      errorMessage={phonesErrorMessage}
      onReload={loadPhoned}
    />
  );
};
