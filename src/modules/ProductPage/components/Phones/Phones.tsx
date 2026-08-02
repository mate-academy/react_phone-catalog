import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getPhonesFromApi } from '../../../shared/utils/api';
import { ProductPage } from '../../ProductPage';

export const Phones = () => {
  const [allPhones, setAllPhones] = useState<Products[]>([]);

  useEffect(() => {
    getPhonesFromApi().then(phonesFromApi => {
      setAllPhones(phonesFromApi);
    });
  }, []);

  return <ProductPage category={allPhones} categoryType="Phones" />;
};
