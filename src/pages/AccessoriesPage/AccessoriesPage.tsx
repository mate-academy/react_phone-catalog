import { useEffect, useState } from 'react';
import { getAccessories } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Products } from '../../type/Productes';

import { Breadcrumb } from '../../components/Content/Breadcrumb';

export const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const pach = ['Accessories'];

  useEffect(() => {
    getAccessories()
      .then(data => setAccessories(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList
        produkt={accessories}
        loader={loader}
        title="Accessories "
      />
    </>
  );
};
