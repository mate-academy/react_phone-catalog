import { useEffect, useState } from 'react';
import { getTablet } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Products } from '../../type/Productes';
import { Breadcrumb } from '../../components/Content/Breadcrumb';

export const TabletsPage = () => {
  const [tablet, setTablet] = useState<Products[]>([]);
  const [loader, setLoader] = useState(true);
  const pach = ['Tablets'];

  useEffect(() => {
    getTablet()
      .then(data => setTablet(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList produkt={tablet} loader={loader} title="Tablets" />
    </>
  );
};
