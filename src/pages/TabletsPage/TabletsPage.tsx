import { useContext, useEffect, useState } from 'react';
import { getTablet } from '../../api';

import { ProductsList } from '../../components/Content/ProductsList';
import { Breadcrumb } from '../../components/Content/Breadcrumb';
import { ProductContext } from '../../context/ProductContext';

export const TabletsPage = () => {
  const [loader, setLoader] = useState(true);
  const { setProduct, visibleProduct } = useContext(ProductContext);

  const pach = ['Tablets'];

  useEffect(() => {
    getTablet()
      .then(data => setProduct(data))
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Breadcrumb path={pach} />
      <ProductsList
        visibleProduct={visibleProduct}
        loader={loader}
        title="Tablets"
      />
    </>
  );
};
