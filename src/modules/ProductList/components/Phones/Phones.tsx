import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getPhonesFromApi } from '../../../shared/utils/api';
import { ProductList } from '../../ProductList';

export const Phones = () => {
  const [allPhones, setAllPhones] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getPhonesFromApi()
      .then(phonesFromApi => {
        setAllPhones(phonesFromApi);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <ProductList
      category={allPhones}
      categoryType="Phones"
      showLoader={loader}
    />
  );
};
