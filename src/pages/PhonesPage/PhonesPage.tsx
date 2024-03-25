import { useEffect, useState } from 'react';
import { getPhones } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Products } from '../../type/Productes';

import { Breadcrumb } from '../../components/Content/Breadcrumb';

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const pach = ['Phones'];

  useEffect(() => {
    getPhones()
      .then(data => {
        setPhones(data);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList produkt={phones} loader={loader} title="Mobile phones" />
    </>
  );
};
