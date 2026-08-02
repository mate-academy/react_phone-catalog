import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getTabletsFromApi } from '../../../shared/utils/api';
import { ProductPage } from '../../ProductPage';

export const Tablets = () => {
  const [allTablets, setAllTablets] = useState<Products[]>([]);

  useEffect(() => {
    getTabletsFromApi().then(phonesFromApi => {
      setAllTablets(phonesFromApi);
    });
  }, []);

  return <ProductPage category={allTablets} categoryType="Tablets" />;
};
