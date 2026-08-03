import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getAccessoriesFromApi } from '../../../shared/utils/api';
import { ProductList } from '../../ProductList';

export const Accessories = () => {
  const [allAccessories, setAllAccessories] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAccessoriesFromApi()
      .then(phonesFromApi => {
        setAllAccessories(phonesFromApi);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <ProductList
      category={allAccessories}
      categoryType="Accessories"
      showLoader={loader}
    />
  );
};
