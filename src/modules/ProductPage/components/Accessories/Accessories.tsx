import { useEffect, useState } from 'react';
import { Products } from '../../../shared/types/Products';
import { getAccessoriesFromApi } from '../../../shared/utils/api';
import { ProductPage } from '../../ProductPage';

export const Accessories = () => {
  const [allAccessories, setAllAccessories] = useState<Products[]>([]);

  useEffect(() => {
    getAccessoriesFromApi().then(phonesFromApi => {
      setAllAccessories(phonesFromApi);
    });
  }, []);

  return <ProductPage category={allAccessories} categoryType="Accessories" />;
};
