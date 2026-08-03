import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getTabletsFromApi } from '../../../shared/utils/api';
import { ProductList } from '../../ProductList';

export const Tablets = () => {
  const [allTablets, setAllTablets] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getTabletsFromApi()
      .then(phonesFromApi => {
        setAllTablets(phonesFromApi);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <ProductList
      category={allTablets}
      categoryType="Tablets"
      showLoader={loader}
    />
  );
};
